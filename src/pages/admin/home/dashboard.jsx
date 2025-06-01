import React from "react";
import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, md: 6 },
          textAlign: "center",
          maxWidth: 600,
          width: "100%",
          bgcolor: "#fff",
          borderRadius: 3,
        }}
      >
        <HourglassEmptyIcon
          color="primary"
          sx={{ fontSize: isMobile ? 60 : 80, mb: 2 }}
        />
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          gutterBottom
          color="primary"
        >
          Dashboard Coming Soon
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We’re working hard to bring you new features and analytics tools. Stay
          tuned — exciting updates are on the way!
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
