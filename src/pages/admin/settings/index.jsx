import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../reducer/authSlice";
import { Logout } from "@mui/icons-material";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAuth();

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
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="center"
            textAlign="center"
            border="1px solid #ccc"
            borderRadius={2}
            p={2}
            gap={1}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              color="primary"
              gutterBottom
            >
              Name : {userData?.name || "Admin"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email : {userData?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role : {userData?.role || "Admin"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        startIcon={<Logout />}
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfileSettings;
