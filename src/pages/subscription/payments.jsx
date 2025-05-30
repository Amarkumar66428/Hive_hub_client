import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./stripe";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_YourPublishableKeyHere");

const StripePayments = () => {
  const navigate = useNavigate();
  // Normally, get clientSecret from your backend (after creating PaymentIntent)
  const clientSecret = "pi_abc123_secret_...";

  const handleSuccess = (paymentIntent) => {
    console.log("Payment succeeded:", paymentIntent);
    // Show success UI or redirect user
  };

  const handleError = (error) => {
    console.error("Payment error:", error);
    // Show error UI or message
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
        >
          Go back to plans
        </Button>
      </Box>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm
          clientSecret={clientSecret}
          onPaymentSuccess={handleSuccess}
          onPaymentError={handleError}
        />
      </Elements>
    </Container>
  );
};

export default StripePayments;
