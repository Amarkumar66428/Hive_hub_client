import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Stack,
  Container,
  Avatar,
} from "@mui/material";
import { getMyStore } from "../../../services/storeService";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";

const ManageStores = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await getMyStore();
        setStore(response?.store || null);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : !store ? (
        <Typography align="center" color="text.secondary">
          No store found.
        </Typography>
      ) : (
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            },
          }}
        >
          {/* Top Banner */}
          <Box
            sx={{
              bgcolor: "primary.light",
              py: 2,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  width: 48,
                  height: 48,
                }}
              >
                <StorefrontIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" color="white">
                  {store.name || "Untitled Store"}
                </Typography>
                <Typography fontSize={14} color="rgba(255,255,255,0.85)">
                  Subdomain: <strong>{store.subdomain || "N/A"}</strong>
                </Typography>
              </Box>
            </Stack>
            <Chip
              label={store.isApproved ? "Approved" : "Pending Approval"}
              color={store.isApproved ? "success" : "warning"}
              variant="filled"
            />
          </Box>

          {/* Bottom Section */}
          <CardContent sx={{ textAlign: "center" }}>
            <Box mb={2}>
              Get Link:{" "}
              <Typography variant="body1" color="text.secondary">
                <Link to={`/hive/${store.subdomain}`} target="_blank">
                  /hive/{store.subdomain}
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ManageStores;
