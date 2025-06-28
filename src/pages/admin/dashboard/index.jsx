import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { DatePicker, Statistic, Alert } from "antd";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("1");

  // Sample Data
  const dashboardStats = [
    {
      title: "Total Users",
      value: 12547,
      prefix: "",
      suffix: "",
      color: "#1890ff",
      trend: 12,
    },
    {
      title: "Active Sessions",
      value: 3847,
      prefix: "",
      suffix: "",
      color: "#52c41a",
      trend: 5,
    },
    {
      title: "Revenue",
      value: 45200,
      prefix: "$",
      suffix: "",
      color: "#722ed1",
      trend: 18,
    },
    {
      title: "System Load",
      value: 67,
      prefix: "",
      suffix: "%",
      color: "#fa8c16",
      trend: -3,
    },
  ];

  const userActivityData = [
    { time: "00:00", users: 120, sessions: 80, pageViews: 450 },
    { time: "04:00", users: 80, sessions: 60, pageViews: 320 },
    { time: "08:00", users: 300, sessions: 250, pageViews: 890 },
    { time: "12:00", users: 450, sessions: 380, pageViews: 1200 },
    { time: "16:00", users: 380, sessions: 320, pageViews: 950 },
    { time: "20:00", users: 280, sessions: 220, pageViews: 670 },
    { time: "24:00", users: 150, sessions: 100, pageViews: 430 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000, orders: 240, users: 180 },
    { month: "Feb", revenue: 3000, orders: 198, users: 150 },
    { month: "Mar", revenue: 5000, orders: 380, users: 280 },
    { month: "Apr", revenue: 4500, orders: 350, users: 260 },
    { month: "May", revenue: 6000, orders: 450, users: 340 },
    { month: "Jun", revenue: 5500, orders: 420, users: 320 },
  ];

  const userDistributionData = [
    { name: "Active", value: 65, color: "#52c41a" },
    { name: "Inactive", value: 25, color: "#faad14" },
    { name: "Suspended", value: 10, color: "#f5222d" },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High CPU usage detected on Server 2",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "info",
      message: "Database backup completed successfully",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "error",
      message: "Failed login attempts detected",
      time: "2 hours ago",
    },
    {
      id: 4,
      type: "success",
      message: "System update deployed successfully",
      time: "3 hours ago",
    },
  ];

  // Dashboard Overview Component
  const DashboardOverview = () => (
    <div>
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {dashboardStats.map((stat, index) => (
          <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card>
              <CardContent>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  valueStyle={{ color: stat.color }}
                />
                <div style={{ marginTop: 8 }}>
                  <span
                    style={{ color: stat.trend > 0 ? "#52c41a" : "#f5222d" }}
                  >
                    {stat.trend > 0 ? "↗" : "↘"} {Math.abs(stat.trend)}%
                  </span>
                  <span style={{ marginLeft: 8, color: "#666" }}>
                    vs last period
                  </span>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* User Activity Chart */}
        <Grid item size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#1890ff"
                    fill="#1890ff"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stackId="1"
                    stroke="#52c41a"
                    fill="#52c41a"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* User Distribution */}
        <Grid item size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {userDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue & Orders
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#1890ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="#52c41a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Alerts
              </Typography>
              <div style={{ maxHeight: 300, overflowY: "auto" }}>
                {systemAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    message={alert.message}
                    description={alert.time}
                    type={alert.type}
                    showIcon
                    style={{ marginBottom: 8 }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  // Analytics Component
  const Analytics = () => (
    <div>
      <Typography variant="h5" style={{ marginBottom: 24 }}>
        Analytics & Reports
      </Typography>

      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Typography variant="h6">Performance Metrics</Typography>
                <RangePicker />
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#1890ff"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke="#52c41a"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#722ed1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );

  // Main Content Renderer
  const renderContent = () => {
    switch (activeTab) {
      case "1":
        return <DashboardOverview />;
      case "2":
        return <UserManagement />;
      case "3":
        return <Analytics />;
      default:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6">Coming Soon</Typography>
              <Typography variant="body1">
                This section is under development.
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Container maxWidth="xl" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
          {renderContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
