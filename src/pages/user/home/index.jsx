import React from "react";
import { Box, Typography, Container } from "@mui/material";

const UserHome = () => {
  return (
    <Container maxWidth="s">
      <Box sx={{ p: 4 }}>
        {/* Welcome Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
          >
            Welcome, {"xyz"}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default UserHome;
