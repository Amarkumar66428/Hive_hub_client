import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../reducer/authSlice";
import userService from "../../services/userService";
import { formatDate } from "../../utils/helper";
import { CheckCircleOutline, LocalOffer, Star } from "@mui/icons-material";

const Input = styled("input")({
  display: "none",
});

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAuth();
  const [plansLoading, setPlansLoading] = useState(false);
  const [plans, setPlans] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
  });

  const fetchPlans = async () => {
    try {
      setPlansLoading(true);
      const response = await userService?.getMySubscription();
      console.log("response: ", response);
      setPlans(response?.subscription || {});
    } catch (error) {
      console.log(error);
    } finally {
      setPlansLoading(false);
    }
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        image: userData.image || "",
      });
      // ignore JSON parse errors
    }
    fetchPlans();
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const savingsPercentage = (plan) => {
    const savings = plan?.price - plan?.offer;

    return Math.round((savings / plan?.price) * 100);
  };

  const daysRemaining = (subscription) =>
    Math.ceil(
      (new Date(subscription?.endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

  const handleUpgradePlan = () => {
    console.log("handleUpgradePlan");
  };

  const logout = () => {
    Cookies.remove("access_token");
    dispatch(clearUserData());
    navigate("/auth/signin");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          boxSizing: "border-box",
          width: "50%",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          color="primary"
          gutterBottom
          textAlign="center"
        >
          Profile Settings
        </Typography>

        <Box sx={{ textAlign: "center", my: 4, position: "relative" }}>
          <Avatar
            src={formData.image}
            alt="Profile"
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
          <label htmlFor="upload-photo">
            <Input
              accept="image/*"
              id="upload-photo"
              type="file"
              onChange={handleImageChange}
            />
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                left: "calc(50% + 25px)",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "grey.300",
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </label>
        </Box>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mx: "auto",
          }}
        >
          <TextField
            fullWidth
            label="Name"
            name="Name"
            value={formData.name || userData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email || userData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ borderRadius: 2 }}
              onClick={logout}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2 }}
              onClick={() => alert("Save logic here")}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Card>
      {plansLoading ? (
        <PlanSkeleton />
      ) : (
        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  Current Subscription
                </Typography>
                <Chip
                  label={plans?.isActive ? "Active" : "Inactive"}
                  color={plans?.isActive ? "success" : "error"}
                  icon={<CheckCircleOutline />}
                />
              </Box>
              <Star sx={{ fontSize: 40, color: "gold" }} />
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Plan Details Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                {plans?.planId?.name}
              </Typography>

              {/* Pricing */}
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  mb: 3,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
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
                      label={`Save ${savingsPercentage(plans?.planId)}%`}
                      color="warning"
                      icon={<LocalOffer />}
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2">
                      You save ${plans?.planId?.price - plans?.planId?.offer}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Features */}
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Plan Features
              </Typography>
              <List
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                }}
              >
                {plans.planId.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Subscription Timeline */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Subscription Details
              </Typography>
              <Stack spacing={2}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Subscription Period
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Started: {formatDate(plans.startDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expires: {formatDate(plans.planId.durationInDays)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontWeight: "bold" }}
                  >
                    {daysRemaining(plans) > 0
                      ? `${daysRemaining} days remaining`
                      : "Expired"}
                  </Typography>
                </Paper>
              </Stack>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Upgrade />}
                onClick={handleUpgradePlan}
                sx={{
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                  px: 4,
                  py: 1.5,
                }}
              >
                Upgrade Plan
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                sx={{ px: 4, py: 1.5 }}
              >
                View All Plans
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
      {/* Additional Info Card */}
      <Card
        elevation={2}
        sx={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}
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
