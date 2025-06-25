import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  CircularProgress,
  Card,
  CardMedia,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Alert,
  FormHelperText,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Close,
  PhotoCamera,
  Delete,
  Add,
  Save,
  NavigateNext,
  NavigateBefore,
  CheckCircle,
  Info,
  ShoppingCart,
  Image as ImageIcon,
  Settings,
  Preview,
} from "@mui/icons-material";
import storeService from "../services/storeService";

// Steps configuration
const steps = [
  {
    label: "Product Information",
    description: "Basic product details",
    icon: <Info />,
  },
  {
    label: "Pricing & Inventory",
    description: "Set pricing and stock details",
    icon: <ShoppingCart />,
  },
  {
    label: "Product Images",
    description: "Upload product photos",
    icon: <ImageIcon />,
  },
  {
    label: "Attributes & Variants",
    description: "Product specifications and variants",
    icon: <Settings />,
  },
  {
    label: "Review & Submit",
    description: "Review and finalize product",
    icon: <Preview />,
  },
];

// Categories
const categories = [
  "Clothing & Fashion",
  "Electronics",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Health & Beauty",
  "Toys & Games",
  "Automotive",
];

const AddProductStepperModal = ({ open, onClose, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    basePrice: "",
    sku: "",
    stock: "",
    tags: "",
    images: [],
    attributes: '{"material":"Cotton","fit":"Regular"}',
    variants: [
      { size: "M", color: "Red", stock: 10, price: 599, discount: 10 },
    ],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation for each step
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Product Information
        if (!formData.title.trim())
          newErrors.title = "Product title is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.brand.trim()) newErrors.brand = "Brand is required";
        break;
      case 1: // Pricing & Inventory
        if (!formData.basePrice || parseFloat(formData.basePrice) <= 0)
          newErrors.basePrice = "Valid price is required";
        if (!formData.stock || parseInt(formData.stock) < 0)
          newErrors.stock = "Valid stock quantity is required";
        break;
      case 2: // Images
        if (formData.images.length === 0)
          newErrors.images = "At least one product image is required";
        break;
      case 3: // Attributes & Variants
        try {
          JSON.parse(formData.attributes);
        } catch (e) {
          console.log("e: ", e);
          newErrors.attributes = "Invalid JSON format";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              {
                file,
                preview: e.target.result,
                name: file.name,
              },
            ],
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Variant management
  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        { size: "", color: "", stock: 0, price: 0, discount: 0 },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (formData.variants.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      }));
    }
  };

  const updateVariant = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const productData = {
        ...formData,
        attributes: JSON.parse(formData.attributes),
        basePrice: parseFloat(formData.basePrice),
        stock: parseInt(formData.stock),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        image: formData.images?.[0]?.file || null, // attach only first image file
      };

      const response = await storeService.addItem([productData]);
      console.log("response: ", response);
      handleClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close modal
  const handleClose = () => {
    setActiveStep(0);
    setFormData({
      title: "",
      description: "",
      category: "",
      brand: "",
      basePrice: "",
      sku: "",
      stock: "",
      tags: "",
      images: [],
      attributes: '{"material":"Cotton","fit":"Regular"}',
      variants: [
        { size: "M", color: "Red", stock: 10, price: 599, discount: 10 },
      ],
    });
    setErrors({});
    onClose();
  };

  // Handler to add a key-value pair
  const handleAddAttribute = () => {
    if (attributeKey.trim() && attributeValue.trim()) {
      try {
        const current = JSON.parse(formData.attributes || "{}");
        const updated = {
          ...current,
          [attributeKey.trim()]: attributeValue.trim(),
        };
        setFormData((prev) => ({
          ...prev,
          attributes: JSON.stringify(updated),
        }));
        setAttributeKey("");
        setAttributeValue("");
      } catch (e) {
        console.log("e: ", e);
        setErrors((prev) => ({
          ...prev,
          attributes: "Invalid attribute structure",
        }));
      }
    }
  };

  // Handler to remove a key
  const removeAttribute = (key) => {
    try {
      const current = JSON.parse(formData.attributes || "{}");
      delete current[key];
      setFormData((prev) => ({
        ...prev,
        attributes: JSON.stringify(current),
      }));
    } catch (e) {
      console.log("e: ", e);
      // silently fail
    }
  };

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Stack container spacing={3} columns={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="Product Title"
                value={formData.title}
                onChange={handleChange("title")}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="Enter product title"
                required
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth error={!!errors.category} required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={handleChange("category")}
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Brand"
                  value={formData.brand}
                  onChange={handleChange("brand")}
                  error={!!errors.brand}
                  helperText={errors.brand}
                  placeholder="Enter brand name"
                  required
                />
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Product Description"
                value={formData.description}
                onChange={handleChange("description")}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Describe your product in detail"
                required
              />
            </Stack>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Stack container spacing={3}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Base Price"
                  type="number"
                  value={formData.basePrice}
                  onChange={handleChange("basePrice")}
                  error={!!errors.basePrice}
                  helperText={errors.basePrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  placeholder="0.00"
                  required
                />
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange("stock")}
                  error={!!errors.stock}
                  helperText={errors.stock}
                  placeholder="0"
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="SKU (Optional)"
                value={formData.sku}
                onChange={handleChange("sku")}
                placeholder="Product SKU"
              />
              <TextField
                fullWidth
                label="Tags (Optional)"
                value={formData.tags}
                onChange={handleChange("tags")}
                placeholder="shirt, summer, cotton"
                helperText="Separate tags with commas"
              />
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2, width: "80%", mx: "auto" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              multiple
              type="file"
              onChange={handleImageUpload}
            />

            {formData.images.length === 0 ? (
              <label htmlFor="image-upload">
                <Paper
                  sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px dashed",
                    borderColor: errors.images ? "error.main" : "grey.300",
                    borderRadius: 2,
                    backgroundColor: "grey.50",
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "primary.main",
                      backgroundColor: "primary.50",
                    },
                  }}
                >
                  <PhotoCamera
                    sx={{ fontSize: 48, color: "grey.400", mb: 1 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                  >
                    Click to upload images
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    PNG, JPG up to 10MB
                  </Typography>
                </Paper>
              </label>
            ) : (
              <Card
                sx={{
                  position: "relative",
                  height: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={formData.images[0].preview}
                  alt={formData.images[0].name}
                  sx={{ objectFit: "contain" }}
                />

                {/* Remove Button */}
                <IconButton
                  size="small"
                  onClick={() => removeImage(0)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>

                {/* Change Image Button */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "rgba(0,0,0,0.5)",
                    textAlign: "center",
                    py: 1,
                  }}
                >
                  <label htmlFor="image-upload">
                    <Button
                      variant="text"
                      sx={{
                        color: "#fff",
                        fontWeight: 500,
                        textTransform: "none",
                      }}
                      component="span"
                    >
                      Change Image
                    </Button>
                  </label>
                </Box>
              </Card>
            )}

            {errors.images && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.images}
              </Alert>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#9c27b0" }}
            >
              Product Attributes
            </Typography>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Key"
                  value={attributeKey}
                  onChange={(e) => setAttributeKey(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Value"
                  value={attributeValue}
                  onChange={(e) => setAttributeValue(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleAddAttribute}
                  size="small"
                  sx={{ height: "100%" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>

            {/* Display attributes as chips */}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
              {Object.entries(JSON.parse(formData.attributes || "{}")).map(
                ([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key}: ${value}`}
                    onDelete={() => removeAttribute(key)}
                    variant="outlined"
                    color="primary"
                  />
                )
              )}
            </Stack>

            {errors.attributes && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.attributes}
              </Alert>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Product Variants</Typography>
              <Button
                startIcon={<Add />}
                onClick={addVariant}
                variant="outlined"
                size="small"
              >
                Add Variant
              </Button>
            </Box>

            <Stack spacing={2}>
              {formData.variants.map((variant, index) => (
                <Paper
                  key={index}
                  sx={{ p: 3, border: "1px solid", borderColor: "grey.300" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle1">
                      Variant {index + 1}
                    </Typography>
                    {formData.variants.length > 1 && (
                      <Button
                        size="small"
                        onClick={() => removeVariant(index)}
                        color="error"
                        startIcon={<Delete />}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6} md={2.4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Size"
                        value={variant.size}
                        onChange={(e) =>
                          updateVariant(index, "size", e.target.value)
                        }
                        placeholder="M"
                      />
                    </Grid>
                    <Grid item xs={6} md={2.4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Color"
                        value={variant.color}
                        onChange={(e) =>
                          updateVariant(index, "color", e.target.value)
                        }
                        placeholder="Red"
                      />
                    </Grid>
                    <Grid item xs={4} md={2.4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Stock"
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "stock",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="10"
                      />
                    </Grid>
                    <Grid item xs={4} md={2.4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Price"
                        type="number"
                        value={variant.price}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        }}
                        placeholder="599"
                      />
                    </Grid>
                    <Grid item xs={4} md={2.4}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Discount %"
                        type="number"
                        value={variant.discount}
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "discount",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="10"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Stack>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review all product details before submitting.
            </Alert>

            <Stack spacing={2}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Product Information
                </Typography>
                <Typography>
                  <strong>Title:</strong> {formData.title}
                </Typography>
                <Typography>
                  <strong>Brand:</strong> {formData.brand}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {formData.category}
                </Typography>
                <Typography>
                  <strong>Description:</strong> {formData.description}
                </Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Pricing & Inventory
                </Typography>
                <Typography>
                  <strong>Base Price:</strong> ${formData.basePrice}
                </Typography>
                <Typography>
                  <strong>Stock:</strong> {formData.stock} units
                </Typography>
                <Typography>
                  <strong>SKU:</strong> {formData.sku || "Not provided"}
                </Typography>
                <Typography>
                  <strong>Tags:</strong> {formData.tags || "None"}
                </Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Images & Variants
                </Typography>
                <Typography>
                  <strong>Images:</strong> {formData.images.length} uploaded
                </Typography>
                <Tooltip
                  title={
                    <Box sx={{ p: 1 }}>
                      {formData.variants.map((v, i) => (
                        <Typography
                          key={i}
                          variant="caption"
                          sx={{ display: "block", mb: 0.5 }}
                        >
                          #{i + 1}: Size <strong>{v.size}</strong>, Color{" "}
                          <strong>{v.color}</strong>, Stock{" "}
                          <strong>{v.stock}</strong>, Price{" "}
                          <strong>₹{v.price}</strong>, Discount{" "}
                          <strong>{v.discount}%</strong>
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  placement="top-start"
                >
                  <Typography
                    variant="body2"
                    sx={{ cursor: "pointer", display: "inline-block" }}
                  >
                    <strong>Variants:</strong> {formData.variants.length}{" "}
                    configured
                  </Typography>
                </Tooltip>
              </Paper>
            </Stack>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="primary">
          Add New Product
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Stepper
            activeStep={activeStep}
            orientation="horizontal"
            sx={{ mb: 4 }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: completed
                          ? "success.main"
                          : active
                          ? "primary.main"
                          : "grey.300",
                        color: completed || active ? "white" : "text.secondary",
                      }}
                    >
                      {completed ? (
                        <CheckCircle />
                      ) : (
                        React.cloneElement(step.icon, { fontSize: "small" })
                      )}
                    </Box>
                  )}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {step.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 400 }}>{renderStepContent(activeStep)}</Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          p: 3,
          gap: 2,
        }}
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          startIcon={<NavigateBefore />}
          variant="outlined"
        >
          Back
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            sx={{ minWidth: 140 }}
          >
            {loading ? "Saving..." : "Save Product"}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<NavigateNext />}
          >
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

// Example usage
const ProductStepperExample = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddProduct = async (productData) => {
    console.log("Product data:", productData);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Product added successfully!");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setModalOpen(true)}
        size="large"
      >
        Add Product
      </Button>

      <AddProductStepperModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </Box>
  );
};

export default ProductStepperExample;
