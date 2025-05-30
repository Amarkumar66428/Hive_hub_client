import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import image from "../../../assets/storePage/image1.png";

const WelcomeScreen = ({ onStart }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
        color: "#000",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 1 }}>
        Welcome to HivvHub
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Start Designing your Website
      </Typography>

      <Box
        sx={{
          backgroundColor: "#a6c8ff",
          borderRadius: 3,
          p: 3,
          mb: 4,
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={image} // Your image variable or path here
          alt="Design Illustration"
          sx={{ width: "100%", height: "auto", borderRadius: 2 }}
        />
      </Box>

      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Select a responsive template or go with a blank canvas.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={onStart}
        sx={{
          px: 8,
          py: 1.5,
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: 1,
          backgroundColor: "#430F41",
        }}
      >
        Start Designing
      </Button>
    </Container>
  );
};

export default WelcomeScreen;
