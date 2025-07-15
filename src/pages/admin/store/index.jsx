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
  Grid,
  Card,
  CardContent,
  Container,
  Skeleton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import storeService from "../../../services/storeService";
import { approveStore } from "../../../services/adminService";
import { Switch } from "antd";
import TableSkeleton from "../../../components/tableSkeleton";
import { formatDate } from "../../../utils/helper";
import {
  Store,
  CheckCircle,
  Cancel,
  Search,
  Refresh,
  Add,
} from "@mui/icons-material";

const metrics = [
  {
    title: "Total Stores",
    key: "totalStores",
    icon: <Store sx={{ fontSize: 40, color: "primary.main" }} />,
  },
  {
    title: "Approved Stores",
    key: "approvedStores",
    icon: <CheckCircle sx={{ fontSize: 40, color: "success.main" }} />,
  },
  {
    title: "Unapproved Stores",
    key: "unapprovedStores",
    icon: <Cancel sx={{ fontSize: 40, color: "error.main" }} />,
  },
];

const ManageStores = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storeMetrics, setStoreMetrics] = useState({
    totalStores: 0,
    approvedStores: 0,
    unapprovedStores: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCreatedOn, setFilterCreatedOn] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

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
      const response = await storeService.getStores();
      setStores(response?.stores || []);
      setFilteredStores(response?.stores || []);
      setStoreMetrics({
        totalStores: response?.stores?.length || 0,
        approvedStores:
          response?.stores?.filter((store) => store.isApproved).length || 0,
        unapprovedStores:
          response?.stores?.filter((store) => !store.isApproved).length || 0,
      });
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

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      fetchStores();
      return;
    }
    const filteredStores = stores.filter((store) => {
      const nameMatch = store.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const userMatch = store.ownerId?.email
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const subdomainMatch = store.subdomain
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      return nameMatch || userMatch || subdomainMatch;
    });
    setFilteredStores(filteredStores);
  };

  const handleApprovedChange = (e) => {
    setFilterStatus(e.target.value);
    if (e.target.value === "all") {
      fetchStores();
      return;
    }
    const filteredStores = stores.filter((store) => {
      if (e.target.value === "true") {
        return store.isApproved;
      }
      return !store.isApproved;
    });
    setFilteredStores(filteredStores);
  };

  const handleCreatedOnChange = (e) => {
    setFilterCreatedOn(e.target.value);
    if (e.target.value === "all") {
      fetchStores();
      return;
    }
    const filteredStores = stores.sort((a, b) => {
      if (e.target.value === "new") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    setFilteredStores(filteredStores);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Typography variant="h4">Manage Stores</Typography>
      <Grid container spacing={5} sx={{ mb: 1 }}>
        {metrics.map((metric, index) => {
          const currentValue = storeMetrics[metric.key] || 0;

          return (
            <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent>
                  {/* Header Section */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={2}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        {metric.title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Main Metric Display */}
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    {metric.icon}
                    {loading ? (
                      <Skeleton variant="text" width={100} height={40} />
                    ) : (
                      <Typography variant="h4" fontWeight="700" ml={1}>
                        {currentValue}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Paper sx={{ p: 3, mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            <TextField
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={handleSearch}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />

            <FormControl size="small" sx={{ minWidth: 150, maxWidth: 200 }}>
              <InputLabel>Created on</InputLabel>
              <Select
                value={filterCreatedOn}
                onChange={handleCreatedOnChange}
                label="Created on"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="new">Newest first</MenuItem>
                <MenuItem value="old">Oldest first</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120, maxWidth: 200 }}>
              <InputLabel>Approved</InputLabel>
              <Select
                value={filterStatus}
                onChange={handleApprovedChange}
                label="Approved"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="true">Approved</MenuItem>
                <MenuItem value="false">Unapproved</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              size="small"
              onClick={fetchStores}
            >
              Sync Data
            </Button>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Subdomain</TableCell>
              <TableCell>Approved</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableSkeleton rows={5} columns={5} showActions={true} />
            ) : filteredStores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No stores found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStores.map((store) => (
                <TableRow key={store._id} hover>
                  <TableCell>{store.name || "Untitled"}</TableCell>
                  <TableCell>{store.ownerId?.email || "N/A"}</TableCell>
                  <TableCell>{formatDate(store.createdAt) || "N/A"}</TableCell>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ManageStores;
