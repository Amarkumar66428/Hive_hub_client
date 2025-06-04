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
  Switch,
 } from "@mui/material";

const ManageInvite = () => {
  const [tableData, setTableData] = useState([]);
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
      // const response = await getInvites();
      // console.log(response);
      // setTableData(response?.invites || []);
    } catch (error) {
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (storeId, isApproved) => {
    setActionLoading({ type: "approve", storeId });
    try {
      // await approveInvite(storeId, !isApproved);
      setTableData((prevTableData) =>
        prevTableData.map((store) =>
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
      // await blockInvite(storeId, !isBlocked);
      setTableData((prevTableData) =>
        prevTableData.map((store) =>
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
              <TableCell>Invite Code</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Blocked</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No stores found.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((store) => (
                <TableRow key={store._id}>
                  <TableCell>{store.name || "N/A"}</TableCell>
                  <TableCell>{store.inviteCode || "N/A"}</TableCell>
                  <TableCell>{store.email || "N/A"}</TableCell>

                  <TableCell>
                    {actionLoading.type === "approve" &&
                    actionLoading.storeId === store._id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Switch
                        checked={store.isActive}
                        onChange={() =>
                          handleApprove(store._id, store.isActive)
                        }
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    {actionLoading.type === "block" &&
                    actionLoading.storeId === store._id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Switch
                        checked={!store.isBlocked}
                        onChange={() =>
                          handleBlockToggle(store._id, store.isBlocked)
                        }
                      />
                    )}
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

export default ManageInvite;
