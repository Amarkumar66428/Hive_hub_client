import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";

const Input = styled("input")({
  display: "none",
});

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
  });

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

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          p: 4,
          display: "flex",  
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Card
          sx={{
            maxWidth: "800px",
            backgroundColor: "#ffffff",
            padding: { xs: 3, md: 5 },
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

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 1, borderRadius: 2 }}
                onClick={() => alert("Save logic here")}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default ProfileSettings;
