import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
  Grid,
  CardHeader,
} from "@mui/material";
import { Stack } from "@mui/system";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../reducer/authSlice";
import userService from "../../../services/userService";
import { formatDate } from "../../../utils/helper";
import {
  CalendarToday,
  CheckCircle,
  CheckCircleOutline,
  LocalOffer,
  Logout,
  Upgrade,
} from "@mui/icons-material";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAuth();
  const [plansLoading, setPlansLoading] = useState(false);
  const [plans, setPlans] = useState({});

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const response = await userService?.getMySubscription();
      setPlans(response?.subscription || {});
    } catch (error) {
      console.log(error);
    } finally {
      setPlansLoading(false);
    }
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    fetchPlans();
  }, []);

  const savingsPercentage = (plan) => {
    const savings = plan?.price - plan?.offer;

    return Math.round((savings / plan?.price) * 100);
  };

  const daysRemaining = (subscription) =>
    Math.ceil(
      (new Date(subscription?.endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

  const handleUpgradePlan = () => {
    navigate("/subscription/plans");
  };

  const logout = () => {
    Cookies.remove("access_token");
    dispatch(clearUserData());
    navigate("/auth/signin");
  };

  return (
    <Box
      sx={{ p: 2 }}
      component="main"
      role="main"
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      flexGrow={1}
    >
      {plansLoading ? (
        <PlanSkeleton />
      ) : (
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    p: 2,
                    gap: 1,
                    height: "100%",
                  }}
                >
                  <CardHeader
                    title="Profile Settings"
                    subheader="Manage your profile settings"
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="primary"
                      gutterBottom
                    >
                      Name : {userData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email : {userData.email}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={logout}
                      startIcon={<Logout />}
                    >
                      Logout
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card elevation={2} sx={{ p: 2 }}>
                  {Object.keys(plans).length > 0 ? (
                    <>
                      {/* Header Section */}

                      <Box sx={{ my: 2, textAlign: "center" }}>
                        <Typography variant="h6" component="h4" gutterBottom>
                          Current Subscription
                        </Typography>
                      </Box>

                      <Divider sx={{ mb: 2 }} />

                      {/* Plan Details Section */}
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h5"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                          >
                            {plans?.planId?.name}
                          </Typography>
                          <Chip
                            label={plans?.isActive ? "Active" : "Inactive"}
                            color={plans?.isActive ? "success" : "error"}
                            icon={<CheckCircleOutline />}
                          />
                        </Box>

                        {/* Pricing */}
                        <Paper
                          elevation={1}
                          sx={(theme) => ({
                            p: 3,
                            mb: 3,
                            background: `linear-gradient(135deg,  #000 0%, ${theme.palette.primary.main} 100%)`,
                            color: "white",
                          })}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                variant="h3"
                                component="span"
                                sx={{ fontWeight: "bold" }}
                              >
                                ${plans?.planId?.offer}
                              </Typography>
                              <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                  textDecoration: "line-through",
                                  ml: 2,
                                  opacity: 0.7,
                                }}
                              >
                                ${plans?.planId?.price}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              <Chip
                                label={`Save ${savingsPercentage(
                                  plans?.planId
                                )}%`}
                                color="warning"
                                icon={<LocalOffer />}
                                sx={{ mb: 1 }}
                              />
                              <Typography variant="body2">
                                You save $
                                {plans?.planId?.price - plans?.planId?.offer}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>

                        {/* Features */}
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          Plan Features
                        </Typography>
                        <List
                          sx={{
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          {plans?.planId?.features?.map((feature, index) => (
                            <ListItem key={index} sx={{ py: 0 }}>
                              <ListItemIcon>
                                <CheckCircle color="success" />
                              </ListItemIcon>
                              <ListItemText primary={feature} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      {/* Subscription Timeline */}
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ fontWeight: "bold" }}
                        >
                          Subscription Details
                        </Typography>
                        <Stack spacing={2}>
                          <Paper elevation={1} sx={{ p: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <CalendarToday
                                sx={{ mr: 1, color: "primary.main" }}
                              />
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold" }}
                              >
                                Subscription Period
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Started: {formatDate(plans.startDate)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Expires:{" "}
                              {formatDate(plans?.planId?.durationInDays)}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ mt: 1, fontWeight: "bold" }}
                            >
                              {daysRemaining(plans) > 0
                                ? `${daysRemaining(plans)} days remaining`
                                : "Expired"}
                            </Typography>
                          </Paper>
                        </Stack>
                      </Box>

                      {/* Action Buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="medium"
                          startIcon={<Upgrade />}
                          onClick={handleUpgradePlan}
                          sx={{
                            background:
                              "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                            px: 2,
                            py: 1,
                          }}
                        >
                          Upgrade Plan
                        </Button>
                        <Button
                          variant="outlined"
                          size="medium"
                          color="primary"
                          sx={{ px: 2, py: 1 }}
                        >
                          View All Plans
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                      >
                        Subscription Plan
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        You are currently not subscribed to any plan.
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Please subscribe to a plan to access all features.
                      </Typography>
                      <Button
                        variant="contained"
                        size="medium"
                        startIcon={<Upgrade />}
                        onClick={handleUpgradePlan}
                        sx={{
                          background:
                            "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                          px: 2,
                          py: 1,
                        }}
                      >
                        Upgrade Plan
                      </Button>
                    </>
                  )}
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      <Card
        elevation={2}
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact our support team if you have any questions about your
            subscription or need assistance with upgrading your plan.
          </Typography>
          <Button variant="text" color="primary" sx={{ mt: 1 }}>
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileSettings;

const PlanSkeleton = () => (
  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Skeleton variant="text" width="60%" height={28} />
          <Skeleton variant="text" width="80%" height={20} />
        </Box>
      </Box>

      <Skeleton
        variant="rectangular"
        height={100}
        sx={{ borderRadius: 2, mb: 2 }}
      />

      <Stack spacing={1}>
        {[...Array(5)].map((_, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width="70%" sx={{ ml: 1 }} />
          </Box>
        ))}
      </Stack>
    </CardContent>

    <CardActions sx={{ p: 2 }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={48}
        sx={{ borderRadius: 1 }}
      />
    </CardActions>
  </Card>
);
