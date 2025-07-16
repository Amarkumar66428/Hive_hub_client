import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  TextField,
  Divider,
  Chip,
  Rating,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  FavoriteBorder,
  LocalShipping,
  Security,
} from "@mui/icons-material";
import shopersService from "../../services/shopersService";
import { useNavigate, useParams } from "react-router-dom";

const ShoppingCart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [removingItem, setRemovingItem] = useState(null);

  const removeItem = async (id) => {
    try {
      setRemovingItem(id);
      await shopersService.removeProductFromCart(id);
      setCartItems((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingItem(null);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await shopersService.getCart();
        const itemsWithSelectedVariant = (res.cart?.items || []).map(
          (item) => ({
            ...item,
            selectedVariant: item?.productId?.variants?.[0]?.size,
          })
        );
        setCartItems(itemsWithSelectedVariant);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const fetchSubtotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      const variant = item?.productId?.variants?.find(
        (i) => i.size === item.selectedVariant
      );
      if (variant) {
        total += variant.price * item.quantity;
      }
    });

    return total;
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
              </Box>
            ) : cartItems.length === 0 ? (
              <Typography variant="h6" fontWeight={700}>
                No items in cart
              </Typography>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  item={item}
                  removeItem={removeItem}
                  setCartItems={setCartItems}
                  removingItem={removingItem}
                />
              ))
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Checkout
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              subtotal={fetchSubtotal()}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShoppingCart;

const CartItem = ({ item, removeItem, setCartItems, id, removingItem }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [selectedVariant, setSelectedVariant] = useState(
    item?.productId?.variants?.[0] || {}
  );

  const updateQuantity = (newQuantity) => {
    if (newQuantity <= 0) return;
    setQuantity(newQuantity);
    setCartItems((items) =>
      items.map((i) =>
        i._id === item._id ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  const updateVariant = (variant) => {
    setSelectedVariant(variant);
    setCartItems((items) =>
      items.map((i) =>
        i._id === item._id ? { ...i, selectedVariant: variant?.size } : i
      )
    );
  };

  return (
    <Card key={item.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box
              component="img"
              src={item?.productId?.images?.[0] || ""}
              alt={item?.productId?.title || ""}
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                {item?.productId?.brand || ""}
              </Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                {item?.productId?.title || ""}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <Rating
                  value={item?.productId?.averageRating || 0}
                  precision={0.5}
                  size="small"
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  ({item?.productId?.averageRating || 0})
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {item?.productId?.variants?.length > 0 && (
                  <FormControl size="small" sx={{ minWidth: 160 }}>
                    <InputLabel>Variant</InputLabel>
                    <Select
                      label="Variant"
                      value={selectedVariant?.size || ""}
                      onChange={(e) => {
                        const variant = item.productId.variants.find(
                          (v) => v.size === e.target.value
                        );
                        updateVariant(variant);
                      }}
                      renderValue={(selected) => {
                        const variant = item.productId.variants.find(
                          (v) => v.size === selected
                        );
                        return variant
                          ? `Size: ${variant.size} / ${variant.color} / $${variant.price}`
                          : "";
                      }}
                    >
                      {item.productId.variants.map((variant, index) => (
                        <MenuItem key={index} value={variant.size}>
                          <Box>
                            <Typography variant="body2">
                              Size: {variant.size}
                            </Typography>
                            <Typography variant="body2">
                              Color: {variant.color}
                            </Typography>
                            <Typography variant="body2">
                              Price: ${variant.price}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700} color="primary">
                  ${selectedVariant?.price || item?.productId?.price || 0}
                </Typography>
                {item?.productId?.basePrice && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      MRP:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ${item?.productId?.basePrice}
                    </Typography>
                  </Box>
                )}
                {selectedVariant?.discount && (
                  <Chip
                    label={`${selectedVariant?.discount}%`}
                    color="success"
                    size="small"
                  />
                )}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Box sx={{ textAlign: "right" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  mb: 2,
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() => updateQuantity(quantity - 1)}
                  size="small"
                  sx={{ border: "1px solid #ddd" }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  value={quantity}
                  size="small"
                  sx={{ width: 60 }}
                  inputProps={{
                    style: { textAlign: "center" },
                    readOnly: true,
                  }}
                />
                <IconButton
                  onClick={() => updateQuantity(quantity + 1)}
                  size="small"
                  sx={{ border: "1px solid #ddd" }}
                >
                  <Add />
                </IconButton>
              </Box>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                $
                {(selectedVariant?.price || item?.productId?.price || 0) *
                  quantity}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <IconButton color="default" size="small">
                  <FavoriteBorder />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => removeItem(id)}
                  disabled={removingItem === id}
                >
                  {removingItem === id ? (
                    <CircularProgress size={16} color="error" />
                  ) : (
                    <Delete />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Checkout = ({ promoCode, setPromoCode, subtotal }) => {
  const { subdomain } = useParams();
  const navigate = useNavigate();
  const [appliedPromo, setAppliedPromo] = useState(null);

  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal - discount + shipping;

  const applyPromoCode = () => {
    if (promoCode === "AMK20") {
      setAppliedPromo({ code: "AMK20", discount: 20 });
    } else if (promoCode === "SAVE10") {
      setAppliedPromo({ code: "SAVE10", discount: 10 });
    } else {
      setAppliedPromo({ code: "", discount: 0 });
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        position: "sticky",
        top: 20,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          Order Summary
        </Typography>

        {/* Promo Code */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Promo Code
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={applyPromoCode}
              sx={(theme) => ({
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: "rgba(107, 27, 120, 0.1)",
                },
              })}
            >
              Apply
            </Button>
          </Box>
          {appliedPromo && (
            <Chip
              label={`${appliedPromo.code} applied (-${appliedPromo.discount}%)`}
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Price Breakdown */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Subtotal:</Typography>
            <Typography fontWeight={600}>${subtotal}</Typography>
          </Box>
          {discount > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography color="success.main">Discount:</Typography>
              <Typography color="success.main" fontWeight={600}>
                ${discount.toFixed(2)}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Shipping:</Typography>
            <Typography fontWeight={600}>
              {shipping === 0 ? "FREE" : `$${shipping}`}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={700}>
              Total:
            </Typography>
            <Typography variant="h6" fontWeight={700} color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Checkout Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            py: 1.5,
            mb: 2,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          })}
          onClick={() => {
            navigate(`/hive/${subdomain}/checkout`, {
              state: {
                total,
              },
            });
          }}
        >
          Proceed to Checkout
        </Button>
        <Paper sx={{ p: 2, backgroundColor: "#f8f9fa" }}>
          <List dense>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LocalShipping color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Free shipping on orders over $200"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Secure payment & 30-day return"
                primaryTypographyProps={{ variant: "body2" }}
              />
            </ListItem>
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};
