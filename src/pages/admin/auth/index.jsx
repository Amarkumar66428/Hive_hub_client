import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import { adminSignIn } from "../../../services/authService";
import { useSnackbar } from "../../../features/snackBar";

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
    if (!form.email || !form.password) {
      showSnackbar("Please fill all the fields", "error");
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        email: form.email,
        password: form.password,
      };
      const response = await adminSignIn(body);
      console.log('response: ', response);

      if (response?.data) {
        showSnackbar("Login successful", "success");
        localStorage.setItem("user", JSON.stringify(response.data));
        Cookies.set("access_token", response.data.token, { expires: 1 });
        navigate("/admin/home/dashboard");
      }
    } catch (error) {
      console.error(error);
      showSnackbar(error?.response?.data?.message || "Login failed", "error");
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
          Admin Signin
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
            color: "#fff",
            "&::before, &::after": {
              borderColor: "#fff",
            },
          }}
        >
          OR
        </Divider>

        <form style={{ width: "100%" }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <label
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
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

            <Box display="flex" flexDirection="column" gap={1}>
              <label
                style={{
                  fontWeight: 500,
                  marginBottom: 4,
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
      </Box>
    </section>
  );
};

export default Signin;
