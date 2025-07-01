import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Link,
  InputAdornment,
  FormControl,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import shopersService from "../../../services/shopersService";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSnackbar } from "../../../features/snackBar";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../reducer/authSlice";
import Cookies from "js-cookie";

const AuthModals = ({
  signInOpen,
  setSignInOpen,
  signUpOpen,
  setSignUpOpen,
}) => {
  const { showSnackbar } = useSnackbar();
  const { dispatch } = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerm: false,
  });

  const handleSignInChange = (field) => (event) => {
    setSignInData({
      ...signInData,
      [field]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSignUpChange = (field) => (event) => {
    setSignUpData({
      ...signUpData,
      [field]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSignUpPhoneCode = (value, data) => {
    setSignUpData({ ...signUpData, countryCode: data.dialCode });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        email: signInData.email,
        password: signInData.password,
      };
      const response = await shopersService.signIn(body);
      Cookies.set("token", response?.token, { expires: 1 });
      dispatch(setUserData({ user: response?.user }));
      console.log("Sign In:", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }
    try {
      setLoading(true);
      const body = {
        name: signUpData.firstName + " " + signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password,
        countryCode: signUpData.countryCode,
        phone: signUpData.phoneNumber,
      };
      const response = await shopersService.signUP(body);
      console.log("Sign Up:", response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const switchToSignUp = () => {
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const switchToSignIn = () => {
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  return (
    <>
      <Dialog
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
            color: "white",
            p: 4,
            textAlign: "center",
            position: "relative",
          })}
        >
          <IconButton
            onClick={() => setSignInOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: 3, mb: 1 }}
          >
            AMK
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Sign in to your account to continue shopping
          </Typography>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSignInSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={signInData.email}
              onChange={handleSignInChange("email")}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={signInData.password}
              onChange={handleSignInChange("password")}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={signInData.rememberMe}
                    onChange={handleSignInChange("rememberMe")}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link href="#" color="primary" sx={{ textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 2,
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: 1,
                background: "linear-gradient(135deg, #6d1c4a, #8b2f5c)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #5d1640, #7a2850)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(109, 28, 74, 0.3)",
                },
                mb: 3,
              }}
            >
              Sign In
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Don't have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={switchToSignUp}
                color="primary"
                sx={{ textDecoration: "none", fontWeight: 600 }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={(theme) => ({
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
            color: "white",
            p: 4,
            textAlign: "center",
            position: "relative",
          })}
        >
          <IconButton
            onClick={() => setSignUpOpen(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ fontWeight: 900, letterSpacing: 3, mb: 1 }}
          >
            AMK
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Join AMK
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Create your account and discover premium fashion
          </Typography>
        </Box>

        <DialogContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSignUpSubmit}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={signUpData.firstName}
                onChange={handleSignUpChange("firstName")}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={signUpData.lastName}
                onChange={handleSignUpChange("lastName")}
                required
              />
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={signUpData.email}
              onChange={handleSignUpChange("email")}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <Box
              className="public-app-phone-input"
              sx={{ display: "flex", gap: 1, mb: 2 }}
            >
              <FormControl sx={{ width: 50 }}>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  onChange={handleSignUpPhoneCode}
                  value={signUpData.countryCode}
                  inputStyle={{ display: "none" }}
                />
              </FormControl>

              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                value={signUpData.phoneNumber}
                onChange={handleSignUpChange("phoneNumber")}
                required
                placeholder="Enter your phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={signUpData.password}
              onChange={handleSignUpChange("password")}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={signUpData.confirmPassword}
              onChange={handleSignUpChange("confirmPassword")}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={signUpData.agreeToTerm}
                  onChange={handleSignUpChange("agreeToTerm")}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link
                    href="#"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Privacy Policy *
                  </Link>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!signUpData.agreeToTerm || loading}
              sx={(theme) => ({
                py: 2,
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: 1,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: "#ccc",
                },
                mb: 3,
              })}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
              Already have an account?{" "}
              <Link
                component="button"
                type="button"
                onClick={switchToSignIn}
                color="primary"
                sx={{ textDecoration: "none", fontWeight: 600 }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
