// components/common/ConfirmDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "Cancel",
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onCancel}
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
