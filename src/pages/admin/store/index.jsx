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
} from "@mui/material";
import { getStores } from "../../../services/storeService";
import { approveStore, blockStore } from "../../../services/adminService";
import { Switch } from "antd";
import TableSkeleton from "../../../components/tableSkeleton";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  // Row-level action loading
  const [actionLoading, setActionLoading] = useState({
    type: null, // "approve" | "block"
    storeId: null,
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await getStores();
      setStores(response?.stores || []);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (storeId, isApproved) => {
    setActionLoading({ type: "approve", storeId });
    try {
      await approveStore(storeId, !isApproved);
      setStores((prevStores) =>
        prevStores.map((store) =>
          store._id === storeId ? { ...store, isApproved: !isApproved } : store
        )
      );
    } catch (error) {
      console.error("Error approving store:", error);
    } finally {
      setActionLoading({ type: null, storeId: null });
    }
  };

  const handleBlockToggle = async (storeId, isBlocked) => {
    setActionLoading({ type: "block", storeId });
    try {
      await blockStore(storeId, !isBlocked);
      setStores((prevStores) =>
        prevStores.map((store) =>
          store._id === storeId ? { ...store, isBlocked: !isBlocked } : store
        )
      );
    } catch (error) {
      console.error("Error blocking store:", error);
    } finally {
      setActionLoading({ type: null, storeId: null });
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Manage Stores</Typography>

      <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Subdomain</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Blocked</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={5} showActions={true} />
            ) : stores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No stores found.
                </TableCell>
              </TableRow>
            ) : (
              stores.map((store) => (
                <TableRow key={store._id}>
                  <TableCell>{store.name || "Untitled"}</TableCell>
                  <TableCell>{store.ownerId?.email || "N/A"}</TableCell>
                  <TableCell>{store.subdomain || "N/A"}</TableCell>

                  <TableCell>
                    <Switch
                      className="plan-active-switch"
                      loading={
                        actionLoading.type === "approve" &&
                        actionLoading.storeId === store._id
                      }
                      checked={store.isApproved}
                      onChange={() =>
                        handleApprove(store._id, store.isApproved)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Switch
                      className="plan-active-switch"
                      loading={
                        actionLoading.type === "block" &&
                        actionLoading.storeId === store._id
                      }
                      checked={!store.isBlocked}
                      onChange={() =>
                        handleBlockToggle(store._id, store.isBlocked)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageStores;
