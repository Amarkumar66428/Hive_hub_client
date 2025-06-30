import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "../../../features/snackBar";
import { useParams } from "react-router-dom";
import storeService from "../../../services/storeService";
import { Typography } from "antd";
import { Save } from "@mui/icons-material";

const SiteFormDialog = ({ open, layout, onClose }) => {
  const { template, type, storeId } = useParams();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subdomain: "",
    customDomain: "",
  });

  useEffect(() => {
    setFormData({
      name: layout.siteName,
    });
  }, [layout?.siteName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async (formData) => {
    try {
      setLoading(true);
      const storeData = {
        name: formData.name,
        description: formData.description || "Store Description",
        subdomain: formData.subdomain || "store-name",
        customDomain: formData.customDomain || "https://store-name.com",
        layout: { ...layout },
        TemplateId: "1",
      };
      const response =
        type === "edit" && template
          ? await storeService.updateStore(storeId, { layout: { ...layout } })
          : await storeService.createStore(storeData);
      if (response) {
        setFormData({
          name: "",
          description: "",
          subdomain: "",
          customDomain: "",
        });
        showSnackbar("Store created successfully", "success");
        // navigate("/user/home/create-store", { state: { screen: 2 } });
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

  const handleSubmit = async () => {
    if (validate()) {
      await handlePublish(formData);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{storeId ? "Confirm" : "Site Information"}</DialogTitle>
      <DialogContent>
        {storeId ? (
          <span>Are you sure you want to Update Changes to store?</span>
        ) : (
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                label="Site Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                required
                label="Description"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="Subdomain"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleChange}
                error={!!errors.subdomain}
                helperText={errors.subdomain}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                required
                label="Custom Domain"
                name="customDomain"
                value={formData.customDomain}
                onChange={handleChange}
                error={!!errors.customDomain}
                helperText={errors.customDomain}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
        >
          {loading
            ? storeId
              ? "Updating..."
              : "Publishing..."
            : storeId
            ? "Update"
            : "Publish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SiteFormDialog;
