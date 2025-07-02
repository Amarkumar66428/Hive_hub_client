import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { createInviteCode } from "../../../services/adminService";
import { useSnackbar } from "../../../features/snackBar";
import { useNavigate } from "react-router-dom";

const InviteCodeModal = ({ open, onClose, fetchInvites }) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: false, email: false });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validate = () => {
    const { name, email } = formData;
    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    };
    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      showSnackbar("Please provide valid input in all fields", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await createInviteCode(formData);
      if (response) {
        showSnackbar("Invite code generated successfully", "success");
        onClose();
        fetchInvites();
        navigate("/admin/manage-invite");
      } else {
        showSnackbar(response?.message || "Unknown error occurred", "error");
      }
    } catch (err) {
      console.error("Invite Error:", err);
      showSnackbar("Failed to generate invite code", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: { xs: 2, sm: 4 },
          py: 3,
        },
      }}
    >
      <DialogTitle>Invite New User</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Full Name"
            fullWidth
            value={formData.name}
            onChange={handleChange("name")}
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
            autoComplete="off"
            size="medium"
            variant="outlined"
          />

          <TextField
            label="Email Address"
            fullWidth
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            helperText={errors.email ? "Enter a valid email address" : ""}
            autoComplete="off"
            size="medium"
            variant="outlined"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} variant="text" color="secondary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            minWidth: 140,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            px: 3,
            py: 1.2,
            borderRadius: 2,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Send Invite"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteCodeModal;
