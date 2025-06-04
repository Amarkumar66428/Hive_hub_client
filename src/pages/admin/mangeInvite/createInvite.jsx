import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { createInviteCode } from "../../../services/adminService"; // must accept { name, email, phone }
import { useSnackbar } from "../../../features/snackBar";
import { useNavigate } from "react-router-dom";

const InviteCode = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validate = () => {
    const { name, email } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email) {
      setError(true);
      showSnackbar("Please fill in all fields", "error");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError(true);
      showSnackbar("Please provide a valid email address", "error");
      return false;
    }

    return true;
  };

  const generateInviteCode = async () => {
    if (!validate()) return;

    setLoading(true);
    setError(false);
    try {
      const response = await createInviteCode(formData);
      if (response) {
        showSnackbar("Invite code generated successfully", "success");
        navigate("/admin/manage-invite");
      } else {
        showSnackbar(response?.message, "error");
      }
    } catch (error) {
      console.error("Failed to generate invite code:", error);
      setError(true);
      showSnackbar("Failed to generate code. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Invite New User</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%" }}
      >
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={handleChange("name")}
          sx={{ mb: 2 }}
          error={error && !formData.name}
          helperText={error && !formData.name ? "Please provide a name" : ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generateInviteCode();
            }
          }}
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email}
          onChange={handleChange("email")}
          sx={{ mb: 2 }}
          error={error && !formData.email}
          helperText={error && !formData.email ? "Please provide an email" : ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              generateInviteCode();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={generateInviteCode}
          disabled={loading}
          sx={{ alignSelf: "flex-start", fontSize: "1.2rem", padding: "10px 20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Send Invite"}
        </Button>
      </Box>
    </Box>
  );
};

export default InviteCode;
