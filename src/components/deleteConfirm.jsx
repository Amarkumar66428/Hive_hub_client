import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

const DeleteConfirm = ({
  confirmDelete,
  setConfirmDelete,
  handleDelete,
  actionLoading,
  type,
}) => {
  return (
    <Dialog
      open={confirmDelete.open}
      onClose={() => setConfirmDelete({ open: false, id: null })}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {type}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmDelete({ open: false, id: null })}
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={handleDelete}
          disabled={actionLoading.type === "delete"}
        >
          {actionLoading.type === "delete" ? (
            <CircularProgress size={20} />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirm;
