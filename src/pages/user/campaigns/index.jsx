import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  Checkbox,
  Menu,
  MenuList,
  MenuItem as MenuItemComponent,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
  LinearProgress,
  Tooltip,
  Badge,
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
  Visibility as VisibilityIcon,
  TouchApp as ClickIcon,
  People as PeopleIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  DateRange as DateRangeIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Campaigns = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCampaignForMenu, setSelectedCampaignForMenu] = useState(null);

  const campaigns = [
    {
      id: 1,
      name: "Summer Fashion Sale 2024",
      platform: "google",
      status: "active",
      budget: 5000,
      spent: 3250,
      impressions: 125000,
      clicks: 3420,
      conversions: 156,
      cpc: 0.95,
      ctr: 2.74,
      conversionRate: 4.56,
      roas: 4.2,
      startDate: "2024-06-01",
      endDate: "2024-07-31",
    },
    {
      id: 2,
      name: "Brand Awareness Q3",
      platform: "facebook",
      status: "active",
      budget: 3000,
      spent: 1850,
      impressions: 89000,
      clicks: 2150,
      conversions: 95,
      cpc: 0.86,
      ctr: 2.42,
      conversionRate: 4.42,
      roas: 3.8,
      startDate: "2024-07-01",
      endDate: "2024-09-30",
    },
    {
      id: 3,
      name: "Holiday Collection Pre-Launch",
      platform: "google",
      status: "paused",
      budget: 8000,
      spent: 4200,
      impressions: 156000,
      clicks: 4680,
      conversions: 234,
      cpc: 0.9,
      ctr: 3.0,
      conversionRate: 5.0,
      roas: 5.2,
      startDate: "2024-05-15",
      endDate: "2024-08-15",
    },
    {
      id: 4,
      name: "Retargeting Campaign - Cart Abandoners",
      platform: "facebook",
      status: "active",
      budget: 2000,
      spent: 1200,
      impressions: 45000,
      clicks: 1800,
      conversions: 128,
      cpc: 0.67,
      ctr: 4.0,
      conversionRate: 7.11,
      roas: 6.5,
      startDate: "2024-06-15",
      endDate: "2024-08-15",
    },
  ];

  const overviewStats = {
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    totalClicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    avgCPC: campaigns.reduce((sum, c) => sum + c.cpc, 0) / campaigns.length,
    avgCTR: campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length,
    avgROAS: campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length,
  };

  // Performance chart data
  const performanceData = campaigns.map((campaign) => ({
    name:
      campaign.name.length > 15
        ? campaign.name.substring(0, 15) + "..."
        : campaign.name,
    fullName: campaign.name,
    spent: campaign.spent,
    clicks: campaign.clicks / 100, // Scale down for better visualization
    conversions: campaign.conversions * 10, // Scale up for better visualization
    roas: campaign.roas * 1000, // Scale up for better visualization
    platform: campaign.platform,
  }));

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesPlatform =
      filterPlatform === "all" || campaign.platform === filterPlatform;
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCampaignSelect = (campaignId) => {
    setSelectedCampaigns((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleMenuOpen = (event, campaignId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaignForMenu(campaignId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCampaignForMenu(null);
  };

  const toggleCampaignStatus = (campaignId, currentStatus) => {
    // API call would go here
    console.log(`Toggling campaign ${campaignId} from ${currentStatus}`);
    handleMenuClose();
  };

  const getPlatformIcon = (platform) => {
    if (platform === "google") {
      return (
        <Avatar
          sx={{ width: 24, height: 24, bgcolor: "#4285f4", fontSize: "12px" }}
        >
          G
        </Avatar>
      );
    } else if (platform === "facebook") {
      return (
        <Avatar
          sx={{ width: 24, height: 24, bgcolor: "#1877f2", fontSize: "12px" }}
        >
          F
        </Avatar>
      );
    }
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      active: { color: "success", label: "Active" },
      paused: { color: "warning", label: "Paused" },
      ended: { color: "error", label: "Ended" },
    };

    return (
      <Chip
        label={statusConfig[status]?.label || status}
        color={statusConfig[status]?.color || "default"}
        size="small"
      />
    );
  };

  const renderDashboard = () => (
    <Box>
      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Total Spent
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${overviewStats.totalSpent.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TrendingUpIcon
                      sx={{ color: "success.main", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography variant="body2" color="success.main">
                      +12.5%
                    </Typography>
                  </Box>
                </Box>
                <MoneyIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Total Impressions
                  </Typography>
                  <Typography variant="h4" component="div">
                    {(overviewStats.totalImpressions / 1000).toFixed(0)}K
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TrendingUpIcon
                      sx={{ color: "success.main", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography variant="body2" color="success.main">
                      +8.3%
                    </Typography>
                  </Box>
                </Box>
                <VisibilityIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Total Clicks
                  </Typography>
                  <Typography variant="h4" component="div">
                    {overviewStats.totalClicks.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TrendingDownIcon
                      sx={{ color: "error.main", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography variant="body2" color="error.main">
                      -2.1%
                    </Typography>
                  </Box>
                </Box>
                <ClickIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Conversions
                  </Typography>
                  <Typography variant="h4" component="div">
                    {overviewStats.totalConversions}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <TrendingUpIcon
                      sx={{ color: "success.main", fontSize: 16, mr: 0.5 }}
                    />
                    <Typography variant="body2" color="success.main">
                      +18.7%
                    </Typography>
                  </Box>
                </Box>
                <PeopleIcon color="secondary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Performance Chart */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">Performance Overview</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<DateRangeIcon />}
              size="small"
            >
              Last 30 Days
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              size="small"
            >
              Export
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <RechartsTooltip
                formatter={(value, name) => {
                  if (name === "spent") return [`$${value}`, "Spent"];
                  if (name === "clicks")
                    return [`${(value * 100).toLocaleString()}`, "Clicks"];
                  if (name === "conversions")
                    return [`${Math.round(value / 10)}`, "Conversions"];
                  if (name === "roas")
                    return [`${(value / 1000).toFixed(1)}x`, "ROAS"];
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.fullName;
                  }
                  return label;
                }}
              />
              <Legend />
              <Bar dataKey="spent" fill="#1976d2" name="Spent ($)" />
              <Bar dataKey="clicks" fill="#388e3c" name="Clicks (×100)" />
              <Bar
                dataKey="conversions"
                fill="#f57c00"
                name="Conversions (×10)"
              />
              <Bar dataKey="roas" fill="#7b1fa2" name="ROAS (×1000)" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Platform Performance */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Google Ads Performance
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Active Campaigns</Typography>
                <Typography fontWeight="medium">
                  {
                    campaigns.filter(
                      (c) => c.platform === "google" && c.status === "active"
                    ).length
                  }
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Total Spend</Typography>
                <Typography fontWeight="medium">
                  $
                  {campaigns
                    .filter((c) => c.platform === "google")
                    .reduce((sum, c) => sum + c.spent, 0)
                    .toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="textSecondary">Avg. ROAS</Typography>
                <Typography fontWeight="medium" color="success.main">
                  {(
                    campaigns
                      .filter((c) => c.platform === "google")
                      .reduce((sum, c) => sum + c.roas, 0) /
                    campaigns.filter((c) => c.platform === "google").length
                  ).toFixed(1)}
                  x
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Facebook Ads Performance
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Active Campaigns</Typography>
                <Typography fontWeight="medium">
                  {
                    campaigns.filter(
                      (c) => c.platform === "facebook" && c.status === "active"
                    ).length
                  }
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Total Spend</Typography>
                <Typography fontWeight="medium">
                  $
                  {campaigns
                    .filter((c) => c.platform === "facebook")
                    .reduce((sum, c) => sum + c.spent, 0)
                    .toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="textSecondary">Avg. ROAS</Typography>
                <Typography fontWeight="medium" color="success.main">
                  {(
                    campaigns
                      .filter((c) => c.platform === "facebook")
                      .reduce((sum, c) => sum + c.roas, 0) /
                    campaigns.filter((c) => c.platform === "facebook").length
                  ).toFixed(1)}
                  x
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  const renderCampaigns = () => (
    <Box>
      {/* Campaign Controls */}
      <Paper sx={{ p: 3, mb: 3 }}>
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
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                label="Platform"
              >
                <MenuItem value="all">All Platforms</MenuItem>
                <MenuItem value="google">Google Ads</MenuItem>
                <MenuItem value="facebook">Facebook Ads</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="ended">Ended</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" startIcon={<RefreshIcon />} size="small">
              Sync Data
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowCreateDialog(true)}
            >
              Create Campaign
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Selected Actions */}
      {selectedCampaigns.length > 0 && (
        <Alert
          severity="info"
          sx={{ mb: 2 }}
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" color="inherit">
                Bulk Edit
              </Button>
              <Button size="small" color="inherit">
                Pause Selected
              </Button>
            </Box>
          }
        >
          {selectedCampaigns.length} campaign(s) selected
        </Alert>
      )}

      {/* Campaigns Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedCampaigns.length > 0 &&
                    selectedCampaigns.length < filteredCampaigns.length
                  }
                  checked={
                    filteredCampaigns.length > 0 &&
                    selectedCampaigns.length === filteredCampaigns.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCampaigns(filteredCampaigns.map((c) => c.id));
                    } else {
                      setSelectedCampaigns([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Campaign</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Spent</TableCell>
              <TableCell align="right">Impressions</TableCell>
              <TableCell align="right">Clicks</TableCell>
              <TableCell align="right">CTR</TableCell>
              <TableCell align="right">CPC</TableCell>
              <TableCell align="right">Conversions</TableCell>
              <TableCell align="right">ROAS</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCampaigns.includes(campaign.id)}
                    onChange={() => handleCampaignSelect(campaign.id)}
                  />
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {campaign.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {campaign.startDate} - {campaign.endDate}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getPlatformIcon(campaign.platform)}
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {campaign.platform}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{getStatusChip(campaign.status)}</TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    ${campaign.budget.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box>
                    <Typography variant="body2">
                      ${campaign.spent.toLocaleString()}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(campaign.spent / campaign.budget) * 100}
                      sx={{ mt: 0.5, height: 4 }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {campaign.impressions.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {campaign.clicks.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {campaign.ctr.toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    ${campaign.cpc.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2">
                    {campaign.conversions}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    color={
                      campaign.roas >= 4
                        ? "success.main"
                        : campaign.roas >= 2
                        ? "warning.main"
                        : "error.main"
                    }
                    fontWeight="medium"
                  >
                    {campaign.roas.toFixed(1)}x
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip
                    title={
                      campaign.status === "active"
                        ? "Pause Campaign"
                        : "Start Campaign"
                    }
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        toggleCampaignStatus(campaign.id, campaign.status)
                      }
                    >
                      {campaign.status === "active" ? (
                        <PauseIcon />
                      ) : (
                        <PlayIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, campaign.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderAnalytics = () => (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Trends
            </Typography>
            <Box
              sx={{
                height: 400,
                bgcolor: "grey.50",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <BarChartIcon sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Advanced Analytics Chart
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Integration with Chart.js, Recharts, or D3.js
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platform Distribution
            </Typography>
            <Box
              sx={{
                height: 200,
                bgcolor: "grey.50",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <PieChartIcon sx={{ fontSize: 60, color: "grey.400", mb: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Pie Chart
              </Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Key Metrics
            </Typography>
            <Box sx={{ space: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Avg. CTR</Typography>
                <Typography fontWeight="medium">
                  {overviewStats.avgCTR.toFixed(2)}%
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography color="textSecondary">Avg. CPC</Typography>
                <Typography fontWeight="medium">
                  ${overviewStats.avgCPC.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="textSecondary">Avg. ROAS</Typography>
                <Typography fontWeight="medium" color="success.main">
                  {overviewStats.avgROAS.toFixed(1)}x
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Campaign Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your Google Ads and Facebook Ads campaigns
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Dashboard" />
          <Tab label="Campaigns" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {selectedTab === 0 && renderDashboard()}
      {selectedTab === 1 && renderCampaigns()}
      {selectedTab === 2 && renderAnalytics()}
      {selectedTab === 3 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Settings</Typography>
          <Typography color="textSecondary">
            Campaign settings and account configuration would go here.
          </Typography>
        </Paper>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={() => console.log("Edit campaign")}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Campaign</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => console.log("Duplicate campaign")}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItemComponent>
        <Divider />
        <MenuItemComponent onClick={() => console.log("Delete campaign")}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItemComponent>
      </Menu>

      {/* Create Campaign Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Campaign Name" variant="outlined" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select label="Platform">
                  <MenuItem value="google">Google Ads</MenuItem>
                  <MenuItem value="facebook">Facebook Ads</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Budget"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => setShowCreateDialog(false)}
          >
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Campaigns;
