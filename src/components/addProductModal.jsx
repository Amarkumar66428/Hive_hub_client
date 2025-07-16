import React, { useEffect, useState } from "react";
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
  Autocomplete,
  styled,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import {
  Close,
  PhotoCamera,
  Delete,
  Add,
  Save,
  NavigateNext,
  NavigateBefore,
  Info,
  ShoppingCart,
  Image as ImageIcon,
  Settings,
  Preview,
} from "@mui/icons-material";
import storeService from "../services/storeService";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,  ${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient( 95deg,  ${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 100%)`,
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.main} 20%, ${theme.palette.secondary.main} 100%)`,
      },
    },
  ],
}));

const addProductButtonStyle = {
  color: "#fff",
  textTransform: "capitalize",
  borderRadius: 0,
  "&:hover": { backgroundColor: "#928aa2" },
};

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Info />,
    2: <ShoppingCart />,
    3: <ImageIcon />,
    4: <Settings />,
    5: <Preview />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// Steps configuration
const steps = [
  {
    label: "Product Information",
    description: "Basic product details",
  },
  {
    label: "Pricing & tags",
    description: "Set pricing and stock details",
  },
  {
    label: "Product Images",
    description: "Upload product photos",
  },
  {
    label: "Attributes & Variants",
  },
  {
    label: "Review & Submit",
    description: "Review and finalize product",
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

// Example usage
const ProductAdd = ({
  modalOpen,
  setModalOpen,
  fetchStore,
  editProduct = {},
  setEditProduct,
}) => {
  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setModalOpen(true)}
        size="large"
        sx={addProductButtonStyle}
      >
        Add Product
      </Button>

      <AddProductStepperModal
        open={modalOpen}
        fetchStore={fetchStore}
        editProduct={editProduct}
        onClose={() => setModalOpen(false)}
        setEditProduct={setEditProduct}
      />
    </Box>
  );
};

export default ProductAdd;

const AddProductStepperModal = ({
  open,
  onClose,
  fetchStore,
  editProduct,
  setEditProduct,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    basePrice: "",
    attributes: {
      material: "Cotton",
      fit: "Regular",
    },
    tags: "",
    category: "",
    images: [],
    variants: [],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(editProduct).length > 0) {
      setFormData(editProduct);
    }
  }, [editProduct]);

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
        if (!formData?.title?.trim())
          newErrors.title = "Product title is required";
        if (!formData?.description?.trim())
          newErrors.description = "Description is required";
        if (!formData?.category) newErrors.category = "Category is required";
        break;
      case 1: // Pricing & Inventory
        if (!formData?.basePrice || parseFloat(formData?.basePrice) <= 0)
          newErrors.basePrice = "Valid price is required";
        break;
      case 2: // Images
        if (formData?.images?.length === 0)
          newErrors.images = "At least one product image is required";
        break;
      case 3:
        // Attributes & Variants
        if (Object.keys(formData?.attributes).length === 0)
          newErrors.attributes = "Invalid JSON format";
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
      images: prev?.images?.filter((_, i) => i !== index),
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
    if (formData?.variants?.length > 1) {
      setFormData((prev) => ({
        ...prev,
        variants: prev?.variants?.filter((_, i) => i !== index),
      }));
    }
  };

  const updateVariant = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev?.variants?.map((variant, i) => {
        if (i !== index) return variant;

        const updatedVariant = { ...variant, [field]: value };

        if (field === "price" && prev.basePrice) {
          const price = parseFloat(value);
          const basePrice = parseFloat(prev.basePrice);
          const discount =
            basePrice > 0 ? ((basePrice - price) / basePrice) * 100 : 0;
          updatedVariant.discount = parseFloat(discount.toFixed(2)); // Rounded to 2 decimals
        }

        return updatedVariant;
      }),
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      const {
        title,
        description,
        basePrice,
        category,
        tags,
        attributes,
        variants,
        images,
      } = formData;

      const productData = {
        title: title.trim(),
        description: description.trim(),
        basePrice: parseFloat(basePrice),
        category: category.trim(),
        tags: Array.isArray(tags)
          ? tags
          : tags
              ?.split(",")
              ?.map((tag) => tag.trim())
              ?.filter(Boolean),
        attributes,
        variants,
        images: images?.map((img) => img.file).filter(Boolean),
      };

      if (Object.keys(editProduct).length === 0) {
        await storeService.addItem([productData]);
      } else {
        await storeService.updateItem(editProduct?._id, productData);
      }

      handleClose();
      fetchStore();
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
      basePrice: "",
      tags: "",
      images: [],
      attributes: { material: "Cotton", fit: "Regular" },
      variants: [
        { size: "M", color: "Red", stock: 10, price: 599, discount: 10 },
      ],
    });
    setErrors({});
    onClose();
    if (Object.keys(editProduct).length > 0) {
      setEditProduct({});
    }
  };

  // Handler to add a key-value pair
  const handleAddAttribute = () => {
    if (attributeKey.trim() && attributeValue.trim()) {
      try {
        const current = formData?.attributes || {};
        const updated = {
          ...current,
          [attributeKey.trim()]: attributeValue.trim(),
        };
        setFormData((prev) => ({
          ...prev,
          attributes: updated,
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
      const current = formData?.attributes || {};
      delete current[key];
      setFormData((prev) => ({
        ...prev,
        attributes: current,
      }));
    } catch (e) {
      console.log("e: ", e);
    }
  };

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 2 }}>
            <Stack spacing={3} columns={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                label="Product Title"
                value={formData?.title}
                onChange={handleChange("title")}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="Enter product title"
                required
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth error={!!errors.category} required>
                  <Autocomplete
                    freeSolo
                    options={categories}
                    value={formData?.category}
                    onChange={(event, newValue) => {
                      handleChange("category")({ target: { value: newValue } });
                    }}
                    onInputChange={(event, newInputValue) => {
                      handleChange("category")({
                        target: { value: newInputValue },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category"
                        placeholder="Select or type a category"
                        error={!!errors.category}
                      />
                    )}
                  />

                  {errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Product Description"
                value={formData?.description}
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
            <Stack spacing={3}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Maximum Retail Price"
                  type="number"
                  value={formData?.basePrice}
                  onChange={handleChange("basePrice")}
                  error={!!errors.basePrice}
                  helperText={errors.basePrice}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  placeholder="0.00"
                  required
                />
              </Box>
              <TextField
                fullWidth
                label="Tags (Optional)"
                value={formData?.tags}
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

            {formData?.images?.length === 0 || !formData?.images ? (
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
                  image={formData?.images?.[0]?.preview || ""}
                  alt={formData?.images?.[0]?.name || ""}
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
            <Typography variant="h6" gutterBottom>
              Product Attributes
            </Typography>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item size={{ xs: 5, md: 3 }}>
                <TextField
                  fullWidth
                  label="Key"
                  value={attributeKey}
                  onChange={(e) => setAttributeKey(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item size={{ xs: 5, md: 3 }}>
                <TextField
                  fullWidth
                  label="Value"
                  value={attributeValue}
                  onChange={(e) => setAttributeValue(e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item size={{ xs: 5, md: 3 }}>
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
              {Object.entries(formData?.attributes || {}).map(
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
              {formData?.variants?.length === 0 ? (
                <Paper
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey.300",
                    textAlign: "center",
                  }}
                >
                  <Typography>Please add Variants</Typography>
                </Paper>
              ) : (
                formData?.variants?.map((variant, index) => (
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
                      {formData?.variants?.length > 1 && (
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
                      <Grid item size={{ xs: 6, md: 2.4 }}>
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
                      <Grid item size={{ xs: 6, md: 2.4 }}>
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
                      <Grid item size={{ xs: 4, md: 2.4 }}>
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
                              parseFloat(e.target.value)
                            )
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                          placeholder="599"
                        />
                      </Grid>
                      <Grid item size={{ xs: 4, md: 2.4 }}>
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
                ))
              )}
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
                  <strong>Title:</strong> {formData?.title}
                </Typography>
                <Typography>
                  <strong>Category:</strong> {formData?.category}
                </Typography>
                <Typography>
                  <strong>Description:</strong> {formData?.description}
                </Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Pricing & Inventory
                </Typography>
                <Typography>
                  <strong>Maximum Retail Price:</strong> ${formData?.basePrice}
                </Typography>
                <Typography>
                  <strong>Tags:</strong> {formData?.tags || "None"}
                </Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Images & Variants
                </Typography>
                <Typography>
                  <strong>Images:</strong> {formData?.images?.length} uploaded
                </Typography>
                <Tooltip
                  title={
                    <Box sx={{ p: 1 }}>
                      {formData?.variants?.map((v, i) => (
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
                    <strong>Variants:</strong> {formData?.variants?.length}{" "}
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
          color: "primary.main",
        }}
      >
        Add New Product
        <IconButton onClick={handleClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            orientation="horizontal"
            sx={{ mb: 4 }}
            connector={<ColorlibConnector />}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  sx={{
                    color: "#000",
                    fontWeight: "bold",
                    ".MuiStepLabel-label": { fontWeight: "600" },
                  }}
                >
                  {step.label}
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    {step.description}
                  </Typography>
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
            {loading
              ? Object.keys(editProduct).length > 0
                ? "Updating..."
                : "Saving..."
              : Object.keys(editProduct).length > 0
              ? "Update Product"
              : "Save Product"}
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
