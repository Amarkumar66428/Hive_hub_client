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
  Paper,
  Skeleton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, MoreVert, Edit, Delete, Visibility } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import storeService from "../../../services/storeService";
import ProductAddExample from "../../../components/addProductModal";
import ProductStepperExample from "../../../components/addProductModal";

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

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null, // placeholder for now
    status: "active",
  },
  {
    id: 2,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null,
    status: "active",
  },
  {
    id: 3,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null,
    status: "active",
  },
  {
    id: 4,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null,
    status: "active",
  },
  {
    id: 5,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null,
    status: "active",
  },
  {
    id: 6,
    name: "Double Bed & Side Tables",
    originalPrice: 230.0,
    currentPrice: 200.0,
    discount: 15,
    image: null,
    status: "active",
  },
];

// Product Card Component
const ProductCardComponent = ({ product, onEdit, onDelete, onView }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuClick = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const calculateDiscount = () => {
    return Math.round(
      ((product.originalPrice - product.currentPrice) / product.originalPrice) *
        100
    );
  };

  return (
    <ProductCard>
      <ProductImage>
        {product.image ? (
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.name}
            onLoad={() => setImageLoading(false)}
            sx={{ display: imageLoading ? "none" : "block" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No Image
          </Typography>
        )}

        {imageLoading && product.image && (
          <Skeleton variant="rectangular" width="100%" height={200} />
        )}

        <DiscountBadge label={`-${calculateDiscount()}%`} />
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
              {product.name}
            </Typography>

            <PriceContainer>
              <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
              <CurrentPrice>${product.currentPrice.toFixed(2)}</CurrentPrice>
            </PriceContainer>
          </Box>

          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ mt: -1, mr: -1 }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
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

// Main Product List Component
const Products = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);

  const handleEditProduct = (product) => {
    console.log("Edit product:", product);
    // Implement edit product logic
  };

  const handleDeleteProduct = (product) => {
    console.log("Delete product:", product);
    // Implement delete product logic
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleViewProduct = (product) => {
    console.log("View product:", product);
    // Implement view product logic
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await storeService?.getMyInventory();
        console.log("response: ", response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Your Listed Products
        </Typography>
        <ProductAddExample />
      </Box>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            border: "2px dashed #e0e0e0",
            borderRadius: 2,
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your first product
          </Typography>
          <ProductStepperExample />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
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
  );
};

export default Products;
