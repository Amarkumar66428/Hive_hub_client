import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  ButtonGroup,
  Button,
  Chip,
} from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 4, bgcolor: "#fff", width: "100%" }}>
      {/* Welcome Header */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
      >
        Welcome, {"xyz"}
      </Typography>

      {/* Offers Section */}
      <Box sx={{ mb: 6 }}>
        <Grid
          container
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {[1, 2].map((offer) => (
            <Grid item xs={12} sm={10} key={offer}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: 2,
                  height: 300,
                  backgroundColor: "#f3f3f3",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Special Offer {offer}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get access to premium features at a discounted rate.
                  </Typography>
                </Box>
                <Box>
                  <Chip label="Limited Time" color="primary" size="small" />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Personalized Recommendations */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mb: 3, fontWeight: "bold", color: "#333", textAlign: "center" }}
      >
        Personalized Recommendations
      </Typography>

      <Box display="flex" justifyContent="center">
        <ButtonGroup
          variant="contained"
          sx={(theme) => ({
            border: `1px solid ${theme.palette.primary.main}`,
          })}
        >
          <Button sx={{ backgroundColor: "#fff", color: "#333", width: 200 }}>
            Monthly
          </Button>
          <Button sx={{ backgroundColor: "#fff", color: "#333", width: 200 }}>
            Yearly{" "}
            <span style={{ color: "gray", marginLeft: 4 }}>(Save 2.5%)</span>
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
