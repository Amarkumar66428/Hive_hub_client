import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "../features/snackBar"; // Optional for feedback

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CreatePlanModal = ({ open, onClose, onCreate }) => {
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    price: "",
    durationInDays: "",
    features: [""],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...form.features];
    updatedFeatures[index] = value;
    setForm((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleAddFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = form.features.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      durationInDays: Number(form.durationInDays),
      features: form.features.filter((f) => f.trim() !== ""),
    };

    if (
      !payload.name ||
      !payload.price ||
      !payload.durationInDays ||
      payload.features.length === 0
    ) {
      showSnackbar("Please fill all required fields", "error");
      return;
    }

    try {
      await onCreate(payload); // You pass the API logic externally
      showSnackbar("Plan created successfully", "success");
      onClose();
      setForm({ name: "", price: "", durationInDays: "", features: [""] });
    } catch (error) {
      showSnackbar("Failed to create plan", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create New Plan</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Plan Name"
            fullWidth
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Price (₹)"
            type="number"
            fullWidth
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />
          <TextField
            label="Duration (Days)"
            type="number"
            fullWidth
            value={form.durationInDays}
            onChange={(e) => handleChange("durationInDays", e.target.value)}
          />

          <Typography variant="subtitle1">Features</Typography>
          {form.features.map((feature, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <TextField
                fullWidth
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
              <IconButton
                onClick={() => handleRemoveFeature(index)}
                disabled={form.features.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={handleAddFeature}
            sx={{ alignSelf: "flex-start" }}
          >
            Add Feature
          </Button>

          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Create Plan
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreatePlanModal;
