import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getMyStore } from "../../../services/storeService";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";

const ManageStores = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveProduct = () => {
    // Add your save logic here
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    // Add your delete logic here
  };

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await getMyStore();
        setStore(response?.store || null);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : !store ? (
        <Typography align="center" color="text.secondary">
          No store found.
        </Typography>
      ) : (
        <Box sx={{ p: 2 }}>
          {/* Store Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                gap: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  py: 2,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="h5" fontWeight="600">
                  Store Details
                </Typography>
              </Box>
              <Box
                sx={{
                  py: 2,
                }}
              >
                <Typography variant="h4" fontWeight="600">
                  Store Name: {store.name || "Untitled Store"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Subdomain:{" "}
                  {store.subdomain
                    ? `${store.subdomain}.yourdomain.com`
                    : "Not set"}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Approval:{" "}
                  </Typography>
                  <Chip
                    label={store.isApproved ? "Approved" : "Pending"}
                    color={store.isApproved ? "success" : "warning"}
                    size="small"
                  />
                  {store.isApproved && (
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/hive/${store.subdomain}`}
                      startIcon={<Visibility />}
                    >
                      View Store
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Products Section */}
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            {/* Section Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h5" fontWeight="600">
                Store Inventory
              </Typography>
            </Box>

            {/* Product List */}
            {products.length > 0 ? (
              <Box>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 3,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="500">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        SKU: {product.sku || "N/A"} | Price: ${product.price}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mr: 4,
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Stock
                        </Typography>
                        <Typography
                          fontWeight="500"
                          color={
                            product.stock <= product.lowStockThreshold
                              ? "error.main"
                              : "inherit"
                          }
                        >
                          {product.stock}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                          Threshold
                        </Typography>
                        <Typography fontWeight="500">
                          {product.lowStockThreshold}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="body1" color="text.secondary">
                  No products available. Add your first product to get started.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Product Edit Modal */}
          <Dialog
            open={Boolean(editingProduct)}
            onClose={() => setEditingProduct(null)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}
              >
                <TextField
                  label="Product Name"
                  value={editingProduct?.name || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="SKU"
                  value={editingProduct?.sku || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sku: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Price"
                  type="number"
                  value={editingProduct?.price || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Stock Quantity"
                  type="number"
                  value={editingProduct?.stock || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: e.target.value,
                    })
                  }
                  fullWidth
                />
                <TextField
                  label="Low Stock Threshold"
                  type="number"
                  value={editingProduct?.lowStockThreshold || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      lowStockThreshold: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSaveProduct}
                disabled={!editingProduct?.name || !editingProduct?.price}
              >
                Save Product
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default ManageStores;
