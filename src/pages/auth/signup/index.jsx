import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import CodeInput from "../../../components/CustomInput/codeInput";
import authService from "../../../services/authService";
import { useSnackbar } from "../../../features/snackBar";

const Signup = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    inviteCode: "",
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = async () => {
    const { name, email, inviteCode, password, confirmPassword } = form;

    if (!name || !email || !inviteCode || !password || !confirmPassword) {
      showSnackbar("Please fill all the fields", "error");
      return;
    }

    if (!validatePassword(password)) {
      showSnackbar(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService?.signUp({
        name,
        email,
        inviteCode,
        password,
      });
      if (response) {
        showSnackbar("Signup successful", "success");
        navigate("/auth/signin");
      }
    } catch (error) {
      console.error(error);
      showSnackbar(error?.response?.data?.message || "Signup failed", "error");
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
        sx={{ fontFamily: "Open Sans" }}
      >
        <Typography variant="h1" sx={{ color: "#fff" }}>
          Signup
        </Typography>

        <Button
          variant="outlined"
          startIcon={<FcGoogle />}
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
            "&::before, &::after": { borderColor: "#fff" },
          }}
        >
          OR
        </Divider>

        <Box display="flex" flexDirection="column" gap={2} width="100%">
          {[
            { label: "Full Name", field: "name", placeholder: "John Doe" },
            { label: "Email", field: "email", placeholder: "demo@example.com" },
            {
              label: "Password",
              field: "password",
              placeholder: "",
              type: "password",
            },
            {
              label: "Confirm Password",
              field: "confirmPassword",
              placeholder: "",
              type: "password",
            },
          ].map(({ label, field, placeholder, type = "text" }) => (
            <Box key={field}>
              <label style={{ fontWeight: 500, color: "#fff" }}>{label}</label>
              <TextField
                type={type}
                variant="outlined"
                placeholder={placeholder}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#fbfcfc70",
                    borderRadius: "8px",
                    "& fieldset": { borderColor: "#ccc" },
                    "&:hover fieldset": { borderColor: "#999" },
                    "&.Mui-focused fieldset": { borderColor: "#666" },
                    "& input": { padding: "12px" },
                  },
                  input: { color: "#fff" },
                }}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            </Box>
          ))}

          <CodeInput
            length={6}
            size="1em"
            value={form.inviteCode}
            onChange={(value) => setForm({ ...form, inviteCode: value })}
          />

          <Button
            variant="contained"
            onClick={handleSignUp}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 500,
              px: 2,
              py: 1,
              fontSize: "1rem",
              backgroundImage:
                "linear-gradient(to bottom, #801B7C 0%, #651562 46%, #4E104C 69%, #450E42 78%, #1A0519 100%)",
              color: "#fff",
              "&:hover": { opacity: 0.9 },
              "&:disabled": { color: "#fff" },
            }}
            fullWidth
            disabled={isLoading}
            startIcon={
              isLoading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            Sign Up
          </Button>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Open Sans",
            letterSpacing: "normal",
          }}
        >
          Already have an account?{" "}
          <Link to="/auth/signin" style={{ color: "#801B7C" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </section>
  );
};

export default Signup;
