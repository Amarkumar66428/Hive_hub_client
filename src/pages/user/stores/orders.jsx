import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Avatar,
  Checkbox,
  Container,
  Tooltip,
} from "@mui/material";
import {
  FileDownload as ExportIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Email as EmailIcon,
  Print as PrintIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import storeService from "../../../services/storeService";
import { formatDate } from "../../../utils/helper";
import TableSkeleton from "../../../components/tableSkeleton";
import { useSnackbar } from "../../../features/snackBar";

const metrics = [
  {
    title: "Total Orders",
    value: "0",
    change: "+0% last week",
    trend: "up",
  },
  {
    title: "Order items over time",
    value: "0",
    change: "+0% last week",
    trend: "up",
  },
  {
    title: "Returns Orders",
    value: "0",
    change: "+0% last week",
    trend: "down",
  },
  {
    title: "Fulfilled orders over time",
    value: "0",
    change: "+0% last week",
    trend: "up",
  },
];

const tabs = ["All", "Unfulfilled", "Unpaid", "Open", "Closed"];

const Orders = () => {
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [moreActionsAnchor, setMoreActionsAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getStatusColor = (status, type) => {
    if (type === "payment") {
      return status === "Success" ? "success" : "warning";
    }
    if (type === "fulfillment") {
      return status === "Fulfilled" ? "success" : "error";
    }
    return "default";
  };

  const getCustomerAvatar = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("page", currentPage);
        params.append("limit", limit);
        const res = await storeService.getAllOrders(params);
        setOrders(res.orders || []);
        setTotalOrders(res.totalOrders);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentPage, limit]);

  const comingSoon = () => {
    showSnackbar("Coming soon", "info");
  };

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4">Orders</Typography>
            <Typography variant="body2" color="text.secondary">
              Jan 1 - Jan 30, 2024
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<ExportIcon />}
              sx={{ textTransform: "none" }}
              onClick={comingSoon}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              endIcon={<MoreVertIcon />}
              onClick={(e) => setMoreActionsAnchor(e.currentTarget)}
              sx={{ textTransform: "none" }}
            >
              More actions
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              onClick={comingSoon}
            >
              Create order
            </Button>
          </Box>
        </Box>
      </Paper>

      <Menu
        anchorEl={moreActionsAnchor}
        open={Boolean(moreActionsAnchor)}
        onClose={() => setMoreActionsAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            setMoreActionsAnchor(null);
            comingSoon();
          }}
        >
          <EmailIcon sx={{ mr: 1 }} fontSize="small" />
          Send Email
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMoreActionsAnchor(null);
            comingSoon();
          }}
        >
          <PrintIcon sx={{ mr: 1 }} fontSize="small" />
          Print
        </MenuItem>
      </Menu>

      <Container maxWidth={false}>
        {/* Metrics Cards */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {metrics.map((metric, index) => (
            <Grid item size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {metric.title}
                  </Typography>
                  <Typography variant="h3" fontWeight="700" sx={{ mb: 1 }}>
                    {metric.value}
                    <Typography
                      component="span"
                      variant="h4"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      -
                    </Typography>
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {metric.trend === "up" ? (
                      <TrendingUpIcon color="success" fontSize="small" />
                    ) : (
                      <TrendingDownIcon color="error" fontSize="small" />
                    )}
                    <Typography
                      variant="body2"
                      color={
                        metric.trend === "up" ? "success.main" : "error.main"
                      }
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Filter Tabs */}
        <Paper sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={(e, newValue) => setSelectedTab(newValue)}
              sx={{ flexGrow: 1 }}
            >
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab}
                  sx={{ textTransform: "none", fontWeight: 500 }}
                />
              ))}
            </Tabs>
            <Box sx={{ display: "flex", gap: 1, p: 1 }}>
              <IconButton size="small">
                <SearchIcon />
              </IconButton>
              <IconButton size="small">
                <FilterIcon />
              </IconButton>
              <IconButton size="small">
                <SortIcon />
              </IconButton>
              <Button
                startIcon={<AddIcon />}
                size="small"
                sx={{ textTransform: "none" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Orders Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>Order</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Delivery</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableSkeleton rows={4} columns={9} showActions={true} />
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Typography variant="body2">No orders found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order, index) => (
                    <TableRow key={index} hover>
                      <TableCell padding="checkbox">
                        <Checkbox size="small" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={order._id} placement="top">
                          <Typography variant="body2" fontWeight="500">
                            #{`${order._id.slice(-6)}...`}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(order.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                          >
                            {getCustomerAvatar(order.userId.name)}
                          </Avatar>
                          <Typography variant="body2">
                            {order.userId.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.paymentStatus}
                          color={getStatusColor(order.paymentStatus, "payment")}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {order.totalAmount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {order.deliveryStatus}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {order.items.length}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small">
                            <EmailIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <PrintIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Orders;
