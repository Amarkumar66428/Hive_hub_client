import React, { useState } from "react";
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

const metrics = [
  {
    title: "Total Orders",
    value: "21",
    change: "+25.3% last week",
    trend: "up",
  },
  {
    title: "Order items over time",
    value: "15",
    change: "+18.2% last week",
    trend: "up",
  },
  {
    title: "Returns Orders",
    value: "0",
    change: "-1.2% last week",
    trend: "down",
  },
  {
    title: "Fulfilled orders over time",
    value: "12",
    change: "+22.2% last week",
    trend: "up",
  },
];

const orders = [
  {
    id: "#1002",
    date: "18 Feb, 2024",
    customer: "Wade Warren",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1004",
    date: "19 Feb, 2024",
    customer: "Esther Howard",
    payment: "Success",
    total: "$22.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1007",
    date: "15 Feb, 2024",
    customer: "Jenny Wilson",
    payment: "Pending",
    total: "$25.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1009",
    date: "17 Feb, 2024",
    customer: "Guy Hawkins",
    payment: "Success",
    total: "$27.00",
    delivery: "N/A",
    items: "5 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1011",
    date: "19 Feb, 2024",
    customer: "Jacob Jones",
    payment: "Pending",
    total: "$32.00",
    delivery: "N/A",
    items: "4 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1013",
    date: "21 Feb, 2024",
    customer: "Kristin Watson",
    payment: "Success",
    total: "$25.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1015",
    date: "23 Feb, 2024",
    customer: "Albert Flores",
    payment: "Pending",
    total: "$28.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1018",
    date: "25 Feb, 2024",
    customer: "Eleanor Pena",
    payment: "Success",
    total: "$35.00",
    delivery: "N/A",
    items: "1 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1019",
    date: "27 Feb, 2024",
    customer: "Theresa Webb",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
];

const tabs = ["All", "Unfulfilled", "Unpaid", "Open", "Closed"];

const Orders = () => {
  const [moreActionsAnchor, setMoreActionsAnchor] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

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
        <MenuItem onClick={() => setMoreActionsAnchor(null)}>
          <EmailIcon sx={{ mr: 1 }} fontSize="small" />
          Send Email
        </MenuItem>
        <MenuItem onClick={() => setMoreActionsAnchor(null)}>
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
                  <TableCell>Fulfillment</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index} hover>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Avatar
                          sx={{ width: 32, height: 32, fontSize: "0.875rem" }}
                        >
                          {getCustomerAvatar(order.customer)}
                        </Avatar>
                        <Typography variant="body2">
                          {order.customer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.payment}
                        color={getStatusColor(order.payment, "payment")}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {order.total}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {order.delivery}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.items}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.fulfillment}
                        color={getStatusColor(order.fulfillment, "fulfillment")}
                        size="small"
                        variant="outlined"
                      />
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};

export default Orders;
