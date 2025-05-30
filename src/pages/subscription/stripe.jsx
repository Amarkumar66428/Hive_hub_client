import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../features/snackBar";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};

const StripePaymentForm = ({
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();


  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    localStorage.setItem("isSubscribed", true);
    navigate("/user/home/dashboard");
    showSnackbar("Payment successful", "success");

    if (!name.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name.trim(),
          },
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      if (onPaymentError) onPaymentError(error);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setPaymentSucceeded(true);
      setLoading(false);
      if (onPaymentSuccess) onPaymentSuccess(paymentIntent);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Payment Details
      </Typography>

      {paymentSucceeded ? (
        <Typography variant="h6" color="success.main">
          Payment successful! Thank you.
        </Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Name on Card"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
          />

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              padding: 2,
              mb: 3,
              backgroundColor: "#fafafa",
            }}
          >
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </Box>

          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!stripe || loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default StripePaymentForm;
