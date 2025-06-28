import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import authService from "../../../services/authService";
import { useSnackbar } from "../../../features/snackBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import userService from "../../../services/userService";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../reducer/authSlice";
import { encryptData } from "../../../utils/encryption";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fbfcfc70",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#999",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#666",
    },
    "& input": {
      padding: "12px",
      color: "#fff",
      caretColor: "#fff",
    },
  },
};

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdminSignIn, setIsAdminSignIn] = useState(false);
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      showSnackbar("Please fill all the fields", "error");
      return;
    }

    try {
      setIsLoading(true);
      const body = { email: form.email, password: form.password };

      if (isAdminSignIn) {
        const response = await authService?.adminSignIn(body);
        if (!response?.data) return;

        Cookies.set("access_token", response?.data?.token, { expires: 1 });
        const role = encryptData("admin");
        localStorage.setItem("role", role);

        dispatch(setUserData({ user: response?.data }));
        showSnackbar("Login successful", "success");
        navigate("/admin/dashboard");
      } else {
        const response = await authService?.signIn(body);
        if (!response?.data?.token) return;

        Cookies.set("access_token", response?.data?.token, { expires: 1 });

        const userData = await userService.getUserdata();
        if (userData) {
          dispatch(
            setUserData({
              user: userData?.user,
              subscription: userData?.subscription,
            })
          );
          showSnackbar("Login successful", "success");
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      showSnackbar(error?.message || "Login failed", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="welcome-page signup-page">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth={400}
        mx="auto"
        gap={2}
        px={isMobile ? 2 : 4}
        py={6}
        sx={{
          fontFamily: "Open Sans",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", textAlign: "center", fontWeight: 600 }}
        >
          Sign In
        </Typography>

        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
          fullWidth
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
            px: 2,
            py: 1,
            fontSize: "1rem",
            borderColor: "#ccc",
            color: "black",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "#aaa",
            },
          }}
        >
          Continue with Google
        </Button>

        <Divider
          sx={{
            width: "100%",
            color: "#fff",
            "&::before, &::after": {
              borderColor: "#fff",
            },
          }}
        >
          OR
        </Divider>

        <form style={{ width: "100%" }} onSubmit={handleSignIn}>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box display="flex" flexDirection="column" gap={1}>
              <label style={{ fontWeight: 500, color: "#fff" }}>Email</label>
              <TextField
                variant="outlined"
                placeholder="demo@example.com"
                fullWidth
                sx={textFieldStyles}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap={1}>
              <label style={{ fontWeight: 500, color: "#fff" }}>Password</label>
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Enter your password"
                fullWidth
                sx={textFieldStyles}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ color: "#fff" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
                px: 2,
                py: 1.2,
                fontSize: "1rem",
                backgroundImage:
                  "linear-gradient(to bottom, #801B7C, #651562, #4E104C, #1A0519)",
                color: "#fff",
                "&:hover": {
                  opacity: 0.9,
                },
                "&:disabled": {
                  color: "#fff",
                },
              }}
              fullWidth
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>
        </form>

        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Open Sans",
          }}
        >
          Don’t have an account?{" "}
          <Link
            to="/auth/signup"
            style={{
              color: "#801B7C",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Sign Up
          </Link>
        </Typography>

        <Button
          variant="text"
          onClick={() => setIsAdminSignIn((prev) => !prev)}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            fontFamily: "Open Sans",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Switch to {!isAdminSignIn ? "Admin" : "User"} Signin
        </Button>
      </Box>
    </section>
  );
};

export default Signin;
