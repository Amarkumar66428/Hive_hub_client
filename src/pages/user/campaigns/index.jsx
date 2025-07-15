import React, { useState, useEffect } from "react";
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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tooltip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Visibility as VisibilityIcon,
  TouchApp as ClickIcon,
  People as PeopleIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
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
} from "recharts";
import campaignsService from "../../../services/campaigns";
import { DatePicker } from "antd";
import { useSnackbar } from "../../../features/snackBar";
import { formatDate } from "../../../utils/helper";

const Campaigns = () => {
  const { showSnackbar } = useSnackbar();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [filterPlatform, setFilterPlatform] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedCampaignForMenu, setSelectedCampaignForMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCreateCampaign, setLoadingCreateCampaign] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [createCampaignData, setCreateCampaignData] = useState({
    type: "",
    platformCampaignId: "",
    startDate: "",
    endDate: "",
  });

  const [platforms, setPlatforms] = useState([]);
  const [statusUpdating, setStatusUpdating] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignsService.getCampaigns();
      setCampaigns(response?.campaigns);
      setPlatforms([
        ...new Set(response?.campaigns?.map((campaign) => campaign.type)),
      ]);
    } catch (error) {
      console.log("error: ", error);
      showSnackbar("Failed to fetch campaigns", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesPlatform =
      filterPlatform === "all" || campaign.type === filterPlatform;
    const matchesStatus =
      filterStatus === "all" || campaign.status === filterStatus;
    const matchesSearch = campaign.type
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const overviewStats = {
    totalImpressions: campaigns.reduce(
      (sum, c) => sum + c.metrics.impressions,
      0
    ),
    totalClicks: campaigns.reduce((sum, c) => sum + c.metrics.clicks, 0),
    totalConversions: campaigns.reduce(
      (sum, c) => sum + c.metrics.conversions,
      0
    ),
  };

  // Performance chart data
  const performanceData = campaigns.map((campaign) => ({
    name:
      campaign.type.length > 6
        ? campaign.type.substring(0, 6) + "..."
        : campaign.type,
    fullName: campaign.type,
    spent: campaign.spent,
    clicks: campaign.clicks / 100, // Scale down for better visualization
    conversions: campaign.conversions * 10, // Scale up for better visualization
    roas: campaign.roas * 1000, // Scale up for better visualization
    platform: campaign.platform,
  }));

  const createCampaign = async () => {
    try {
      setLoadingCreateCampaign(true);
      const response = await campaignsService.createCampaign(
        createCampaignData
      );
      if (response) {
        showSnackbar("Campaign created successfully", "success");
      } else {
        showSnackbar("Failed to create campaign", "error");
      }
      setShowCreateDialog(false);
      setCreateCampaignData({
        type: "",
        platformCampaignId: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.log("error: ", error);
      showSnackbar("Failed to create campaign", "error");
    } finally {
      setLoadingCreateCampaign(false);
    }
  };

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

  // const handleMenuOpen = (event, campaignId) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedCampaignForMenu(campaignId);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  //   setSelectedCampaignForMenu(null);
  // };

  const toggleCampaignStatus = async (campaignId, currentStatus) => {
    try {
      setStatusUpdating(campaignId);
      const response = await campaignsService.updateCampaignStatus(campaignId, {
        status: currentStatus === "active" ? "paused" : "active",
      });
      if (response) {
        showSnackbar("Campaign status updated successfully", "success");
      } else {
        showSnackbar("Failed to update campaign status", "error");
      }
    } catch (error) {
      console.log("error: ", error);
      showSnackbar("Failed to update campaign status", "error");
    } finally {
      setStatusUpdating(null);
    }
  };

  // const getPlatformIcon = (platform) => {
  //   if (platform === "google") {
  //     return (
  //       <Avatar
  //         sx={{ width: 24, height: 24, bgcolor: "#4285f4", fontSize: "12px" }}
  //       >
  //         G
  //       </Avatar>
  //     );
  //   } else if (platform === "facebook") {
  //     return (
  //       <Avatar
  //         sx={{ width: 24, height: 24, bgcolor: "#1877f2", fontSize: "12px" }}
  //       >
  //         F
  //       </Avatar>
  //     );
  //   }
  // };

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
      <Grid container spacing={3} sx={{ mb: 1 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
      <Paper sx={{ p: 3, mb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
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
                {platforms.map((platform) => (
                  <MenuItem key={platform} value={platform}>
                    {platform}
                  </MenuItem>
                ))}
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
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={
                loading ? <CircularProgress size={14} /> : <RefreshIcon />
              }
              size="small"
              onClick={fetchCampaigns}
            >
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
              <TableCell>Campaign Id</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Clicks</TableCell>
              <TableCell align="right">Conversions</TableCell>
              <TableCell align="right">Impressions</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress size={20} />
                </TableCell>
              </TableRow>
            ) : filteredCampaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No campaigns found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCampaigns.length > 0 &&
              filteredCampaigns.map((campaign) => (
                <TableRow key={campaign._id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCampaigns.includes(campaign._id)}
                      onChange={() => handleCampaignSelect(campaign._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {campaign.platformCampaignId}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatDate(campaign.createdAt)} -{" "}
                        {formatDate(campaign.endDate)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {campaign.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{getStatusChip(campaign.status)}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {campaign.metrics.clicks.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {campaign.metrics.conversions}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2">
                      {campaign.metrics.impressions.toLocaleString()}
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
                          toggleCampaignStatus(campaign._id, campaign.status)
                        }
                      >
                        {statusUpdating === campaign._id ? (
                          <CircularProgress size={14} />
                        ) : campaign.status === "active" ? (
                          <PauseIcon />
                        ) : (
                          <PlayIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    {/* <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, campaign.id)}
                  >
                    <MoreVertIcon />
                  </IconButton> */}
                  </TableCell>
                </TableRow>
              ))
            )}
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
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography color="textSecondary">Avg. CTR</Typography>
                <Typography fontWeight="medium">
                  {overviewStats.avgCTR.toFixed(2)}%
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
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
      <Box sx={{ mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Campaign Management
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your Google Ads and Facebook Ads campaigns
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 1 }}>
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
      {/* <Menu
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
      </Menu> */}

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
              <TextField
                fullWidth
                label="Campaign Type"
                variant="outlined"
                value={createCampaignData.type}
                onChange={(e) =>
                  setCreateCampaignData({
                    ...createCampaignData,
                    type: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Platform Campaign ID"
                value={createCampaignData.platformCampaignId}
                onChange={(e) =>
                  setCreateCampaignData({
                    ...createCampaignData,
                    platformCampaignId: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <DatePicker
                  label="Start Date"
                  size="large"
                  onChange={(date) =>
                    setCreateCampaignData({
                      ...createCampaignData,
                      startDate: date.format("YYYY-MM-DD"),
                    })
                  }
                  format="YYYY-MM-DD"
                />
                <DatePicker
                  label="End Date"
                  size="large"
                  onChange={(date) =>
                    setCreateCampaignData({
                      ...createCampaignData,
                      endDate: date.format("YYYY-MM-DD"),
                    })
                  }
                  format="YYYY-MM-DD"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowCreateDialog(false);
              createCampaign();
            }}
            disabled={loadingCreateCampaign}
          >
            {loadingCreateCampaign ? (
              <CircularProgress size={20} sx={{ color: "white" }} />
            ) : (
              "Create Campaign"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Campaigns;
