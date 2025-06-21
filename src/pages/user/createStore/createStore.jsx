import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  CircularProgress,
  Drawer,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Grid,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Modal,
} from "@mui/material";
import {
  Edit,
  Delete,
  Logout,
  Close,
  CloudUpload,
  Save,
  Add,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { createStore } from "../../../services/storeService";
import { useSnackbar } from "../../../features/snackBar";
import Templates2 from "../../templates/templates2";

const CreateStore = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const template = state?.template;
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [itemListDrawerOpen, setItemListDrawerOpen] = useState(false);

  const [itemsList, setItemsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [itemForm, setItemForm] = useState({
    title: "",
    description: "",
    price: "",
    sku: "",
    category: "shop",
    tags: "",
    image: null,
    imagePreview: null,
  });

  const categories = ["shop", "services"];

  const handlePublish = async () => {
    try {
      setLoading(true);
      const storeData = {
        name: template.name,
        subdomain: template.subdomain,
        templateId: template?.id,
        logo: template.icon,
      };
      const response = await createStore(storeData);
      if (response) {
        showSnackbar("Store created successfully", "success");
        navigate("/user/home/create-store", { state: { screen: 2 } });
      }
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);
      setItemForm((prev) => ({ ...prev, image: file, imagePreview }));
    }
  };

  const handleAddItem = () => {
    const newItem = {
      ...itemForm,
      tags: itemForm.tags.split(",").map((tag) => tag.trim()),
    };

    if (editIndex !== null) {
      const updated = [...itemsList];
      updated[editIndex] = newItem;
      setItemsList(updated);
      setEditIndex(null);
      showSnackbar("Item updated", "success");
    } else {
      setItemsList((prev) => [...prev, newItem]);
      showSnackbar("Item added", "success");
    }

    setItemForm({
      title: "",
      description: "",
      price: "",
      sku: "",
      category: "shop",
      tags: "",
      image: null,
      imagePreview: null,
    });
    setDrawerOpen(false);
    setItemListDrawerOpen(true);
  };

  const handleEditItem = (index) => {
    const item = itemsList[index];
    setItemForm({
      ...item,
      tags: item.tags.join(", "),
      image: null,
    });
    setEditIndex(index);
    setDrawerOpen(true);
  };

  const handleDeleteItem = (index) => {
    const updated = [...itemsList];
    updated.splice(index, 1);
    setItemsList(updated);
    showSnackbar("Item deleted", "info");
  };

  useEffect(() => {
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
  }, [itemsList]);

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px={1}
        className="store-editor-header"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            variant="text"
            onClick={() =>
              navigate("/user/home/create-store", { state: { screen: 2 } })
            }
            sx={{
              color: "#fff",
              borderRadius: 0,
              borderRight: "1px solid #928aa2",
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            <Logout sx={{ transform: "rotate(180deg)", color: "#fff" }} />
          </IconButton>
          <Button
            variant="text"
            onClick={() => setDrawerOpen(true)}
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 0,
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            Add Product
          </Button>
          <Button
            variant="text"
            color="info"
            onClick={() => setItemListDrawerOpen(true)}
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              borderRadius: 0,
              "&:hover": { backgroundColor: "#928aa2" },
            }}
          >
            {" "}
            View Products
          </Button>
        </Box>
        <Button
          variant="text"
          onClick={handlePublish}
          disabled={loading}
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            borderRadius: 0,
            backgroundColor: "success.main",
            "&:hover": { backgroundColor: "success.dark" },
          }}
          startIcon={
            loading ? (
              <CircularProgress size={20} sx={{ color: "success.main" }} />
            ) : null
          }
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </Stack>

      <Box sx={{ height: `calc(100vh - 60px)`, overflow: "auto" }}>
        <Templates2 plate template={template} items={itemsList} />
      </Box>

      {/* Add Item Drawer */}
      <Modal
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "flex-end", sm: "center" },
          backdropFilter: "blur(2px)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
            height: { xs: "100vh", sm: "auto" },
            maxHeight: { sm: "90vh" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: { xs: 0, sm: 2 },
            overflowY: "auto",
            right: { xs: 0, sm: "auto" },
          }}
        >
          {/* Close button positioned absolutely */}
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 1,
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Close />
          </IconButton>

          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              {editIndex !== null ? "Edit Product" : "Add New Product"}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box display={"flex"} gap={2}>
              <Stack spacing={2} flex={1}>
                <TextField
                  label="Title"
                  name="title"
                  value={itemForm.title}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />

                <TextField
                  label="Description"
                  name="description"
                  value={itemForm.description}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  size="small"
                />

                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Price"
                      name="price"
                      value={itemForm.price}
                      onChange={handleInputChange}
                      type="number"
                      fullWidth
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="SKU"
                      name="sku"
                      value={itemForm.sku}
                      onChange={handleInputChange}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>

                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={itemForm.category}
                    onChange={handleInputChange}
                    variant="outlined"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Tags (comma separated)"
                  name="tags"
                  value={itemForm.tags}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  helperText="Separate multiple tags with commas"
                />
              </Stack>
              <Stack spacing={3} flex={1}>
                {!itemForm.imagePreview ? (
                  <Box
                    component="label"
                    sx={{
                      position: "relative",
                      display: "block",
                      border: "2px dashed",
                      borderColor: "primary.light",
                      borderRadius: 3,
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "primary.50",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        borderColor: "primary.main",
                        backgroundColor: "primary.100",
                        transform: "translateY(-2px)",
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                    }}
                  >
                    <input
                      hidden
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {/* Upload Icon with Animation */}
                      <Box
                        sx={{
                          position: "relative",
                          p: 2,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          color: "white",
                        }}
                      >
                        <CloudUpload sx={{ fontSize: 32 }} />
                      </Box>

                      {/* Upload Text */}
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          color="primary.main"
                          gutterBottom
                        >
                          Drop your image here
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          or{" "}
                          <strong style={{ color: "#2563eb" }}>
                            click to browse
                          </strong>{" "}
                          from your device
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          sx={{
                            display: "block",
                            bgcolor: "background.paper",
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          PNG, JPG, WEBP up to 5MB
                        </Typography>
                      </Box>

                      {/* Modern Upload Button */}
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CloudUpload />}
                        sx={{
                          mt: 1,
                          borderRadius: 2,
                          px: 4,
                          py: 1.5,
                          textTransform: "none",
                          fontWeight: 600,
                          background: "primary.main",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Choose Image
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      position: "relative",
                      border: "2px dashed",
                      borderColor: "primary.light",
                      borderRadius: 3,
                      p: 1,
                      backgroundColor: "success.50",
                      overflow: "hidden",
                    }}
                  >
                    {/* Image Preview */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 3,
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {/* Image Container */}
                      <Box
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          border: "3px solid white",
                        }}
                      >
                        <Box
                          component="img"
                          src={itemForm.imagePreview}
                          alt="Product preview"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        {/* Image Overlay on Hover */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: "rgba(0,0,0,0.7)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="white"
                            fontWeight="600"
                          >
                            Preview
                          </Typography>
                        </Box>
                      </Box>

                      {/* Image Actions */}
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1.5}>
                          {/* Change Image Button */}
                          <Button
                            variant="outlined"
                            component="label"
                            size="small"
                            startIcon={<CloudUpload />}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              borderColor: "primary.main",
                              color: "primary.main",
                              "&:hover": {
                                bgcolor: "primary.50",
                                borderColor: "primary.dark",
                              },
                            }}
                          >
                            Change
                            <input
                              hidden
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </Button>

                          {/* Remove Button */}
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<Delete />}
                            onClick={() =>
                              setItemForm({ ...itemForm, imagePreview: null })
                            }
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 600,
                              "&:hover": {
                                bgcolor: "error.50",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Stack>
            </Box>
            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                pt: 2,
                position: { sm: "sticky" },
                bottom: 0,
                bgcolor: "background.paper",
                pb: { xs: 2, sm: 0 },
                borderTop: "1px solid",
                borderColor: "divider",
                mt: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => setDrawerOpen(false)}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1em",
                  borderColor: "grey.300",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "grey.400",
                    bgcolor: "grey.50",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1em",
                  "&:hover": {
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    background: "linear-gradient(45deg, #e5e7eb, #d1d5db)",
                    color: "text.disabled",
                    boxShadow: "none",
                  },
                }}
                startIcon={editIndex !== null ? <Save /> : <Add />}
                disabled={!itemForm.imagePreview}
              >
                {editIndex !== null ? "Save Product" : "Add Product"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      {/* View Items Drawer */}
      <Drawer
        anchor="left"
        open={itemListDrawerOpen}
        onClose={() => setItemListDrawerOpen(false)}
      >
        <Box sx={{ width: 600, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Products List
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsList.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {item.imagePreview ? (
                      <img
                        src={item.imagePreview}
                        alt={item.title}
                        width={5}
                        height={5}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditItem(idx)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteItem(idx)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Drawer>
    </Box>
  );
};

export default CreateStore;
