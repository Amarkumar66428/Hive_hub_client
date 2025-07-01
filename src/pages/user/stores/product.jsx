import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Skeleton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Visibility,
  Inventory2Outlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import storeService from "../../../services/storeService";
import ProductAdd from "../../../components/addProductModal";
import { useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { useSnackbar } from "../../../features/snackBar";

// Styled Components
const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const ProductImage = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 200,
  backgroundColor: theme.palette.grey[300],
  backgroundImage:
    "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: 8,
  left: 8,
  backgroundColor: theme.palette.grey[700],
  color: "white",
  fontSize: "0.75rem",
  height: 24,
  zIndex: 1,
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
}));

const CurrentPrice = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.text.primary,
  fontSize: "1rem",
}));

// Main Product List Component
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditProduct = (product) => {
    setModalOpen(true);
    setEditProduct(product || {});
  };

  const handleDeleteProduct = (product) => {
    console.log("Delete product:", product);
  };

  const handleViewProduct = (product) => {
    console.log("View product:", product);
    // Implement view product logic
  };

  const fetchStore = async () => {
    try {
      setLoading(true);
      const response = await storeService.getMyStore();
      setProducts(response?.products || null);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Typography variant="h4" gutterBottom sx={{ m: 0 }}>
            Your Listed Products
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate("/user/manage-store/inventory")}
              startIcon={<Inventory2Outlined />}
            >
              Manage Inventory
            </Button>
            <ProductAdd
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              fetchStore={fetchStore}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />
          </Box>
        </Box>
      </Paper>
      <Container maxWidth={false}>
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <Card>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton variant="text" height={32} width="80%" />
                    <Skeleton variant="text" height={24} width="60%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : products?.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              border: "2px dashed #e0e0e0",
              borderRadius: 2,
              backgroundColor: "#fafafa",
              p: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by adding your first product
            </Typography>
            <ProductAdd
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              fetchStore={fetchStore}
            />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid
                item
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={product?._id}
              >
                <ProductCardComponent
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onView={handleViewProduct}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Load More Button (if needed) */}
        {products.length > 0 && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="outlined" size="large">
              Load More Products
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Products;

const ProductCardComponent = ({ product, onEdit, onDelete, onView }) => {
  const variants = product?.variants[0] || [];
  const [imageLoading, setImageLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isPublished, setIsPublished] = useState(product.isPublished);
  const [publishLoading, setPublishLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const calculateDiscount = () => {
    const price = Number(variants?.price);

    if (!price || isNaN(price) || price <= 0) return 0;

    // Example logic — assuming discountAmount or comparePrice exists
    const originalPrice = Number(product?.basePrice || price);
    const discount = ((originalPrice - price) / originalPrice) * 100;

    return `${Math.round(discount)}%`;
  };

  const handlePublishProduct = (productId) => {
    setPublishLoading(true);
    storeService
      .publishProduct(productId)
      .then((res) => {
        if (res) {
          setIsPublished(!isPublished);
          showSnackbar(
            !isPublished
              ? "Product published successfully"
              : "Product unpublished successfully",
            "success"
          );
        }
      })
      .finally(() => {
        setPublishLoading(false);
      });
  };

  return (
    <ProductCard>
      <ProductImage>
        {product?.images?.length > 0 ? (
          <CardMedia
            component="img"
            height="200"
            image={product?.images[0]}
            alt={product.basePrice}
            onLoad={() => setImageLoading(false)}
            sx={{ display: imageLoading ? "none" : "block", objectFit: "contain", }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Image
          </Typography>
        )}

        {imageLoading && product?.images?.length === 0 && (
          <Skeleton variant="rectangular" width="100%" height={200} />
        )}

        <DiscountBadge label={`${calculateDiscount()}`} />
      </ProductImage>
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontSize: "1rem", fontWeight: 500, mb: 1 }}
            >
              {product.title || "Unknown Product"}
            </Typography>

            <PriceContainer>
              <OriginalPrice>
                ${product.basePrice.toFixed(2) || 0}
              </OriginalPrice>
              <CurrentPrice>${variants.price || 0}</CurrentPrice>
            </PriceContainer>
          </Box>
          <Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Publish
              </Typography>
              <Switch
                checked={isPublished}
                onChange={() => handlePublishProduct(product._id)}
                size="small"
                loading={publishLoading}
              />
              <IconButton size="small" onClick={handleMenuClick}>
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            onView(product);
            handleMenuClose();
          }}
        >
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEdit(product);
            handleMenuClose();
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(product);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </ProductCard>
  );
};
