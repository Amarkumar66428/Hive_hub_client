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
  IconButton,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getStores } from "../../../services/storeService";

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getStores();
        console.log(response);
        setStores(response?.stores);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Manage Stores</Typography>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Features</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : stores?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No items added yet.
                </TableCell>
              </TableRow>
            ) : (
              stores?.map((store, index) => (
                <TableRow key={store._id || index}>
                  <TableCell>{store.name || "Untitled"}</TableCell>
                  <TableCell>
                    {store.price ? `₹${store.price}` : "N/A"}
                  </TableCell>
                  <TableCell>{store.durationInDays || "N/A"}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 80,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Tooltip title={store.features.join(", ") || "N/A"} arrow>
                      <span>{store.features.join(", ") || "N/A"}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" color="error">
                      <DeleteIcon />
                    </IconButton>
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
