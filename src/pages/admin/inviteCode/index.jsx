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
import { createInviteCode } from "../../../services/adminService";

const InviteCode = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateInviteCode = async () => {
    setLoading(true);
    try {
      const response = await createInviteCode();

      const data = await response.code;
      setInviteCode(data || "");
    } catch (error) {
      console.error("Failed to generate invite code:", error);
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
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 480, textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Generate Invite Code
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            fullWidth
            value={inviteCode}
            label="Invite Code"
            InputProps={{
              readOnly: true,
              endAdornment: inviteCode && (
                <Tooltip
                  title={copied ? "Copied" : "Copy"}
                  placement="top"
                  open={Boolean(copied)}
                  disableHoverListener
                  onClose={() => setCopied(false)}
                >
                  <IconButton onClick={handleCopy}>
                    {copied ? <CheckCircle color="success" /> : <ContentCopy />}
                  </IconButton>
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
          sx={{ mt: 2, mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Code"}
        </Button>
      </Paper>
    </Box>
  );
};

export default InviteCode;
