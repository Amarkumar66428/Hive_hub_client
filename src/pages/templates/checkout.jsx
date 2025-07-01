import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  LocalShipping,
  Payment,
  CheckCircle,
  CreditCard,
  AccountBalanceWallet,
  Security
} from '@mui/icons-material';

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Billing Information
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    sameAsShipping: true,
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Additional
    saveAddress: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});

  const steps = ['Shipping', 'Payment', 'Review'];

  const orderItems = [
    {
      id: 1,
      name: "T-SHIRT WITH TAPE DETAILS",
      brand: "AMK COLLECTION",
      size: "M",
      color: "Black",
      quantity: 2,
      price: 120,
      image: "https://via.placeholder.com/64x64/333333/ffffff?text=T"
    },
    {
      id: 2,
      name: "SKINNY FIT JEANS",
      brand: "AMK DENIM",
      size: "32",
      color: "Blue",
      quantity: 1,
      price: 240,
      image: "https://via.placeholder.com/64x64/4a6fa5/ffffff?text=J"
    },
    {
      id: 3,
      name: "CHECKERED SHIRT",
      brand: "AMK CASUAL",
      size: "L",
      color: "Red/Blue",
      quantity: 1,
      price: 120,
      image: "https://via.placeholder.com/64x64/c0392b/ffffff?text=S"
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) { // Shipping
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 1) { // Payment
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.cardholderName) newErrors.cardholderName = 'Cardholder name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
  };

  const renderShippingForm = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shipping Information
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="State"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            error={!!errors.state}
            helperText={errors.state}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="ZIP Code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            error={!!errors.zipCode}
            helperText={errors.zipCode}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            required
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.saveAddress}
              onChange={(e) => handleInputChange('saveAddress', e.target.checked)}
            />
          }
          label="Save this address for future orders"
        />
      </Box>
    </Paper>
  );

  const renderPaymentForm = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <RadioGroup
          value={formData.paymentMethod}
          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCard />
                Credit/Debit Card
              </Box>
            }
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceWallet />
                PayPal
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      {formData.paymentMethod === 'card' && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value)}
              error={!!errors.cvv}
              helperText={errors.cvv}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              error={!!errors.cardholderName}
              helperText={errors.cardholderName}
              required
            />
          </Grid>
        </Grid>
      )}

      {formData.paymentMethod === 'paypal' && (
        <Alert severity="info" sx={{ mt: 2 }}>
          You will be redirected to PayPal to complete your payment.
        </Alert>
      )}

      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!formData.sameAsShipping}
              onChange={(e) => handleInputChange('sameAsShipping', !e.target.checked)}
            />
          }
          label="Use different billing address"
        />
      </Box>
    </Paper>
  );

  const renderReviewOrder = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Review Your Order
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Shipping Address
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formData.firstName} {formData.lastName}<br />
          {formData.address}<br />
          {formData.apartment && `${formData.apartment}, `}
          {formData.city}, {formData.state} {formData.zipCode}<br />
          {formData.country}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Payment Method
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'PayPal'}
          {formData.paymentMethod === 'card' && formData.cardNumber && (
            <span> ending in {formData.cardNumber.slice(-4)}</span>
          )}
        </Typography>
      </Box>

      <Alert severity="success" icon={<Security />}>
        Your payment information is secure and encrypted
      </Alert>
    </Paper>
  );

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            sx={{ mb: 2, color: '#6b1b78' }}
          >
            Back to Cart
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <ShoppingCart sx={{ color: '#6b1b78', fontSize: 32 }} />
            <Typography variant="h4" fontWeight={700} color="#6b1b78">
              Checkout
            </Typography>
          </Box>
        </Box>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderPaymentForm()}
            {activeStep === 2 && renderReviewOrder()}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
                sx={{ borderColor: '#6b1b78', color: '#6b1b78' }}
              >
                Back
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={handlePlaceOrder}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6b1b78',
                    px: 4,
                    py: 1.5,
                    '&:hover': { backgroundColor: '#5a1666' }
                  }}
                >
                  Place Order
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#6b1b78',
                    px: 4,
                    py: 1.5,
                    '&:hover': { backgroundColor: '#5a1666' }
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              
              <List>
                {orderItems.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0, py: 1 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.brand}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Chip label={`Size: ${item.size}`} size="small" />
                            <Chip label={`Color: ${item.color}`} size="small" />
                          </Box>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            Qty: {item.quantity} × ${item.price}
                          </Typography>
                        </Box>
                      }
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      ${item.price * item.quantity}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ space: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${subtotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping:</Typography>
                  <Typography color="success.main">FREE</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tax:</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight={700}>
                    Total:
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#6b1b78">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Alert severity="info" icon={<LocalShipping />}>
                  Free shipping on all orders over $200
                </Alert>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;