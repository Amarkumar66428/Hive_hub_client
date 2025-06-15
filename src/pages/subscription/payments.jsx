import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "./stripe";
import { Container } from "@mui/material";
// Your Stripe publishable key
const stripePromise = loadStripe("pk_test_YourPublishableKeyHere");

const StripePayments = ({ plan, setOpen }) => {
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
    <Container maxWidth="sm">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm
          plan={plan}
          setOpen={setOpen}
          clientSecret={clientSecret}
          onPaymentSuccess={handleSuccess}
          onPaymentError={handleError}
        />
      </Elements>
    </Container>
  );
};

export default StripePayments;
