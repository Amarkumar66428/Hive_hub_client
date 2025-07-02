import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "../../features/snackBar";
import userService from "../../services/userService";
import { setUserData } from "../../reducer/authSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

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
  plan,
  setOpen,
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const user = useAuth();
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) => /^\+?[0-9\s-]{7,15}$/.test(phone);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    // Basic validation
    let hasError = false;
    if (!name.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }
    if (!validatePhone(phone)) {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }
    if (hasError) return;

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);

    const payload = {
      planId: plan._id,
      paymentMethod: "stripe",
    };

    const response = await userService.buySubscription(payload);

    if (!response) {
      setErrorMessage("Payment failed");
      setLoading(false);
      if (onPaymentError) onPaymentError(response);
    } else if (response) {
      setPaymentSucceeded(true);
      setLoading(false);
      navigate("/user/dashboard");
      showSnackbar("Payment successful", "success");
      dispatch(
        setUserData({
          user: user,
          subscription: response.subscription,
        })
      );
      if (onPaymentSuccess) onPaymentSuccess(response);
    }
  };

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        align="center"
      >
        Payment Details
      </Typography>

      {/* Subscription Info */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Subscription Plan:
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>{plan.tier}</strong> — ₹{plan.price} / {plan.type}
        </Typography>
        {plan.features.map((feature) => (
          <Typography variant="body2" color="text.secondary" key={feature}>
            {feature}
          </Typography>
        ))}
      </Box>

      {paymentSucceeded ? (
        <Typography variant="h6" color="success.main" align="center">
          Payment successful! Thank you for your purchase.
        </Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" gutterBottom>
            Your Details
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Name on Card"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Name is required" : ""}
                autoComplete="name"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Valid email is required" : ""}
                autoComplete="email"
                type="email"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError}
                helperText={phoneError ? "Valid phone number is required" : ""}
                autoComplete="tel"
                type="tel"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Billing Address"
                variant="outlined"
                fullWidth
                multiline
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
              />
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>
            Card Details
          </Typography>

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

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!stripe || loading}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              {loading ? "Processing..." : `Pay ₹${plan.price}`}
            </Button>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default StripePaymentForm;
