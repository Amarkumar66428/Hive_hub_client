import React, { useState } from 'react';
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
  Avatar,
  Badge,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Add,
  Remove,
  Delete,
  FavoriteBorder,
  LocalShipping,
  Security,
  ArrowBack,
  ShoppingBag
} from '@mui/icons-material';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "T-SHIRT WITH TAPE DETAILS",
      brand: "AMK COLLECTION",
      price: 120,
      originalPrice: 160,
      size: "M",
      color: "Black",
      quantity: 2,
      image: "/api/placeholder/150/180",
      rating: 4.5,
      reviews: 145,
      inStock: true
    },
    {
      id: 2,
      name: "SKINNY FIT JEANS",
      brand: "AMK DENIM",
      price: 240,
      originalPrice: 300,
      size: "32",
      color: "Blue",
      quantity: 1,
      image: "/api/placeholder/150/180",
      rating: 4.3,
      reviews: 89,
      inStock: true
    },
    {
      id: 3,
      name: "CHECKERED SHIRT",
      brand: "AMK CASUAL",
      price: 120,
      originalPrice: null,
      size: "L",
      color: "Red/Blue",
      quantity: 1,
      image: "/api/placeholder/150/180",
      rating: 4.6,
      reviews: 234,
      inStock: true
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === 'AMK20') {
      setAppliedPromo({ code: 'AMK20', discount: 20 });
    } else if (promoCode === 'SAVE10') {
      setAppliedPromo({ code: 'SAVE10', discount: 10 });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal - discount + shipping;

  return (
    <Box sx={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      pt: 4,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: 180,
                          objectFit: 'cover',
                          borderRadius: 2,
                          backgroundColor: '#f5f5f5'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <Typography variant="overline" color="text.secondary">
                          {item.brand}
                        </Typography>
                        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Rating value={item.rating} precision={0.5} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            ({item.reviews})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                          <Chip label={`Size: ${item.size}`} variant="outlined" size="small" />
                          <Chip label={`Color: ${item.color}`} variant="outlined" size="small" />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Typography variant="h6" fontWeight={700} color="#6b1b78">
                            ${item.price}
                          </Typography>
                          {item.originalPrice && (
                            <Typography 
                              variant="body2" 
                              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              ${item.originalPrice}
                            </Typography>
                          )}
                          {item.originalPrice && (
                            <Chip 
                              label={`-${Math.round((1 - item.price/item.originalPrice) * 100)}%`}
                              color="error" 
                              size="small"
                            />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'flex-end',
                          mb: 2,
                          gap: 1
                        }}>
                          <IconButton 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            size="small"
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            size="small"
                            sx={{ width: 60 }}
                            inputProps={{ 
                              style: { textAlign: 'center' },
                              readOnly: true
                            }}
                          />
                          <IconButton 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            size="small"
                            sx={{ border: '1px solid #ddd' }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                          ${item.price * item.quantity}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <IconButton color="default" size="small">
                            <FavoriteBorder />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => removeItem(item.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 2, boxShadow: 2, position: 'sticky', top: 20 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Order Summary
                </Typography>

                {/* Promo Code */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Promo Code
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
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
                      sx={{ 
                        borderColor: '#6b1b78',
                        color: '#6b1b78',
                        '&:hover': { 
                          borderColor: '#6b1b78',
                          backgroundColor: 'rgba(107, 27, 120, 0.1)'
                        }
                      }}
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography fontWeight={600}>${subtotal}</Typography>
                  </Box>
                  {discount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography color="success.main">Discount:</Typography>
                      <Typography color="success.main" fontWeight={600}>-${discount.toFixed(2)}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Shipping:</Typography>
                    <Typography fontWeight={600}>
                      {shipping === 0 ? 'FREE' : `$${shipping}`}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={700}>Total:</Typography>
                    <Typography variant="h6" fontWeight={700} color="#6b1b78">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Checkout Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6b1b78',
                    py: 1.5,
                    mb: 2,
                    '&:hover': {
                      backgroundColor: '#5a1666'
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LocalShipping color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Free shipping on orders over $200"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Security color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Secure payment & 30-day return"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShoppingCart;