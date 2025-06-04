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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Cookies from "js-cookie";
import { signIn } from "../../../services/authService";
import { useSnackbar } from "../../../features/snackBar";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    "&:hover input": {
      caretColor: "#fff",
    },
  },
};

const Signin = () => {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (form.email === "" || form.password === "") {
      showSnackbar("Please fill all the fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      const body = {
        email: form.email,
        password: form.password,
      };
      const response = await signIn(body);
      if (response?.data) {
        showSnackbar("Login successful", "success");
        localStorage.setItem("user", JSON.stringify(response?.data));
        Cookies.set("access_token", response?.data?.token, { expires: 1 });
        navigate("/user/home/dashboard");
      }
    } catch (error) {
      console.error(error);
      showSnackbar(error.response.data.message, "error");
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
        width={400}
        mx="auto"
        gap={2}
        px={2}
        py={4}
        sx={{
          fontFamily: "Open Sans",
        }}
      >
        <Typography variant="h1" sx={{ color: "#fff" }}>
          Signin
        </Typography>
        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
            paddingX: 2,
            paddingY: 1,
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
            color: "#fff", // text color
            "&::before, &::after": {
              borderColor: "#fff", // line color
            },
          }}
        >
          OR
        </Divider>
        <form style={{ width: "100%" }}>
          <Box display="flex" flexDirection="column" gap={4}>
            <Box display="flex" flexDirection="column" gap={1}>
              <label
                style={{
                  fontWeight: 500,
                  marginBottom: 2,
                  color: "#fff",
                  display: "block",
                }}
              >
                Email
              </label>
              <TextField
                variant="outlined"
                placeholder="demo@example.com"
                fullWidth
                sx={textFieldStyles}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={1} width="100%">
              <label
                style={{
                  fontWeight: 500,
                  marginBottom: 2,
                  color: "#fff",
                  display: "block",
                }}
              >
                Password
              </label>
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
              onClick={handleSignIn}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
                paddingX: 2,
                paddingY: 1,
                fontSize: "1rem",
                backgroundImage:
                  "linear-gradient(to bottom, #801B7C 0%, #651562 46%, #4E104C 69%, #450E42 78%, #1A0519 100%)",
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
              Sign In
            </Button>
          </Box>
        </form>

        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Open Sans",
            letterSpacing: "normal",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            underline="none"
            style={{
              color: "#801B7C",
            }}
          >
            Sign Up
          </Link>
        </Typography>
        <Typography variant="body2" sx={{ color: "#fff" }}>
          <Link
            to="/admin/auth/signin"
            style={{ color: "white", textDecoration: "underline" }}
          >
            Admin Login
          </Link>
        </Typography>
      </Box>
    </section>
  );
};

export default Signin;
