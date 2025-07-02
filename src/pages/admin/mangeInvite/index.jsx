import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  getAllInvites,
  deleteInvite,
  blockUnblockInvite,
} from "../../../services/adminUserSevices";
import { formatDate } from "../../../utils/helper";
import InviteCodeModal from "./createInvite";
import { Switch } from "antd";
import TableSkeleton from "../../../components/tableSkeleton";

const ManageInvite = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [actionLoading, setActionLoading] = useState({
    type: null,
    inviteId: null,
  });

  // Confirmation Dialog
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    inviteId: null,
  });

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    setLoading(true);
    try {
      const response = await getAllInvites();
      setInvites(response?.invites || []);
    } catch (error) {
      console.error("Error fetching invites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlocked = async (inviteId, isBlocked) => {
    setActionLoading({ type: "toggle", inviteId });
    try {
      await blockUnblockInvite(inviteId);
      setInvites((prev) =>
        prev.map((invite) =>
          invite._id === inviteId
            ? { ...invite, isBlocked: !isBlocked }
            : invite
        )
      );
    } catch (error) {
      console.error("Error updating blocked state:", error);
    } finally {
      setActionLoading({ type: null, inviteId: null });
    }
  };

  const handleConfirmDelete = (inviteId) => {
    setConfirmDelete({ open: true, inviteId });
  };

  const handleDelete = async () => {
    const { inviteId } = confirmDelete;
    setActionLoading({ type: "delete", inviteId });

    try {
      await deleteInvite(inviteId);
      setInvites((prev) => prev.filter((invite) => invite._id !== inviteId));
    } catch (error) {
      console.error("Error deleting invite:", error);
    } finally {
      setActionLoading({ type: null, inviteId: null });
      setConfirmDelete({ open: false, inviteId: null });
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Manage Invites</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Invite New User
        </Button>
        <InviteCodeModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          fetchInvites={fetchInvites}
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Invite Code</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={5} showActions={true} />
            ) : invites.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No invites found.
                </TableCell>
              </TableRow>
            ) : (
              invites.map((invite) => (
                <TableRow key={invite._id}>
                  <TableCell>{invite.email || "N/A"}</TableCell>
                  <TableCell>{invite.code || "N/A"}</TableCell>
                  <TableCell>{formatDate(invite.createdAt) || "N/A"}</TableCell>
                  <TableCell>
                    <Switch
                      className="plan-active-switch"
                      loading={
                        actionLoading.type === "toggle" &&
                        actionLoading.inviteId === invite._id
                      }
                      checked={!invite.isBlocked}
                      onChange={() =>
                        handleToggleBlocked(invite._id, invite.isBlocked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleConfirmDelete(invite._id)}>
                      <DeleteOutlineOutlined color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, inviteId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this invite?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete({ open: false, inviteId: null })}
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
    </Box>
  );
};

export default ManageInvite;
