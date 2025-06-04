import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  TextField,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ContentCopy, CheckCircle } from "@mui/icons-material";
import { createInviteCode } from "../../../services/adminService"; // must accept { name, email, phone }
import { useSnackbar } from "../../../features/snackBar";

const InviteCode = () => {
  const { showSnackbar } = useSnackbar();
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
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
      const code = response?.code;
      setInviteCode(code || "");
      showSnackbar("Invite code generated successfully", "success");
    } catch (error) {
      console.error("Failed to generate invite code:", error);
      setError(true);
      showSnackbar("Failed to generate code. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000);
    }
  }, [copied]);

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Generate Invite Code</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "50%" }}>
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

        <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
          <TextField
            fullWidth
            value={inviteCode}
            label="Invite Code"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Tooltip
                  title={copied ? "Copied" : "Copy"}
                  placement="top"
                  open={Boolean(copied)}
                  disableHoverListener
                  onClose={() => setCopied(false)}
                >
                  {inviteCode && (
                    <IconButton onClick={handleCopy}>
                      {copied ? (
                        <CheckCircle color="success" />
                      ) : (
                        <ContentCopy />
                      )}
                    </IconButton>
                  )}
                </Tooltip>
              ),
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={generateInviteCode}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Invite Code"}
        </Button>
      </Box>
    </Box>
  );
};

export default InviteCode;
