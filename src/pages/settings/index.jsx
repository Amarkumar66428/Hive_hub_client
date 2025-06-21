import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Input = styled("input")({
  display: "none",
});

const ProfileSettings = () => {
  const navigate = useNavigate();
  const userData = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          email: user.email || "",
          image: user.image || "",
        });
      } catch {
        // ignore JSON parse errors
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const logout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("user");
    navigate("/auth/signin");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#ffffff",
            padding: 4,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            gutterBottom
            textAlign="center"
          >
            Profile Settings
          </Typography>

          <Box sx={{ textAlign: "center", my: 4, position: "relative" }}>
            <Avatar
              src={formData.image}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                border: "3px solid",
                borderColor: "primary.main",
              }}
            />
            <label htmlFor="upload-photo">
              <Input
                accept="image/*"
                id="upload-photo"
                type="file"
                onChange={handleImageChange}
              />
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "calc(50% + 25px)",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "grey.300",
                  boxShadow: 1,
                  "&:hover": {
                    bgcolor: "grey.100",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </label>
          </Box>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={() => alert("Save logic here")}
            >
              Save Changes
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={logout}
            >
              Logout
            </Button>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfileSettings;
