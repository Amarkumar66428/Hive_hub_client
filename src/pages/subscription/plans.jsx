import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  ButtonGroup,
  Button,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlanCard from "../../components/plansCards";

const PLANS = [
  {
    id: 1,
    type: "monthly",
    tier: "Free",
    price: 10,
    features: [
      "Limited access to content",
      "Testimonials and VSL access",
      "Basic dashboard features",
    ],
  },
  {
    id: 2,
    type: "monthly",
    tier: "3.5K tier",
    price: 20,
    features: [
      "Additional video curriculum",
      "Community access",
      "Mentor calls and webinars",
      "Basic store creation tools",
    ],
  },
  {
    id: 3,
    type: "monthly",
    tier: "6K tier",
    price: 30,
    features: [
      "Advanced features including: ",
      "Store progress tracking",
      "Niche narrowing",
      "Fulfillment updates",
      "Enhanced community access",
    ],
  },
  {
    id: 3,
    type: "yearly",
    tier: "1-2K tier",
    price: 500,
    features: [
      "Limited access to content",
      "Testimonials and VSL access",
      "Basic dashboard features",
    ],
  },
  {
    id: 4,
    type: "yearly",
    tier: "5K tier",
    price: 800,
    features: [
      "Additional video curriculum",
      "Community access",
      "Mentor calls and webinars",
      "Basic store creation tools",
    ],
  },
  {
    id: 5,
    type: "yearly",
    tier: "Premium",
    price: 12997,
    features: [
      "Advanced features including: ",
      "Store progress tracking",
      "Niche narrowing",
      "Fulfillment updates",
      "Enhanced community access",
    ],
  },
];

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectPlan, setSelectPlan] = useState({});

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
          {selectPlan?.id && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/subscription/payment", { state: { plan: selectPlan } })}
            >
              Proceed to Payment
            </Button>
          )}
        </Box>

        {/* Offers Section */}
        <Box sx={{ mb: 6 }}>
          <Grid
            container
            spacing={4}
            alignItems="stretch"
            justifyContent="center"
          >
            {PLANS.filter((plan) => plan.type === selectedPlan).map((offer) => {
              return (
                <Grid key={offer.id} item xs={12} sm={6} md={4} lg={3}>
                  <PlanCard
                    plan={offer}
                    selectPlan={selectPlan}
                    setSelectPlan={setSelectPlan}
                  />
                </Grid>
              );
            })}
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
            <Button
              sx={{
                backgroundColor:
                  selectedPlan === "monthly" ? "primary" : "white",
                color: selectedPlan === "monthly" ? "white" : "black",
                width: 200,
                borderRadius: "inherit",
              }}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </Button>
            <Button
              sx={{
                backgroundColor:
                  selectedPlan === "yearly" ? "primary" : "white",
                color: selectedPlan === "yearly" ? "white" : "black",
                width: 200,
                borderRadius: "inherit",
              }}
              onClick={() => setSelectedPlan("yearly")}
            >
              Yearly{" "}
              <span
                style={{
                  color: selectedPlan === "yearly" ? "white" : "gray",
                  marginLeft: 4,
                }}
              >
                (Save 2.5%)
              </span>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default Plans;
