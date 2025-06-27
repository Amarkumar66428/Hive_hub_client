import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUserData } from "../reducer/authSlice";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    Cookies.remove("access_token");
    dispatch(clearUserData());
    navigate("/auth/signin");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 400 }}
      >
        The page might have been moved or deleted, or you may have typed the URL
        incorrectly.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => logout()}>
        Go to Login
      </Button>
    </Box>
  );
};

export default NotFoundPage;
