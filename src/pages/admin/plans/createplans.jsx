import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  Container,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlanCard from "../../../components/plansCards";
import { createPlan } from "../../../services/storeService";
import { useSnackbar } from "../../../features/snackBar";

const featuresList = [
  "Shop Creation",
  "Product Sourcing/Hunting/listing",
  "Order Fulfillment",
  "Affiliate Reach out",
  "Product Promotions",
  "A.I Content Creation for Products",
  "Appealing Suspended Shops",
];

const CreateTier = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [plan, setPlan] = useState({
    name: "",
    price: "",
    durationInDays: "",
    features: [
      "Shop Creation",
      "Product Sourcing/Hunting/listing",
      "Order Fulfillment",
    ],
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleFeatureToggle = (feature) => {
    setPlan((prev) => {
      const exists = prev.features.includes(feature);
      const updatedFeatures = exists
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];

      return { ...prev, features: updatedFeatures };
    });
  };

  const handleCreatePlan = async () => {
    if (
      plan.name === "" ||
      plan.price === "" ||
      plan.durationInDays === "" ||
      plan.features.length === 0
    ) {
      showSnackbar("Please fill all the fields", "error");
      return;
    }
    try {
      setLoading(true);
      const response = await createPlan(plan);
      console.log(response);
      if (response) {
        showSnackbar("Plan created successfully", "success");
        setPlan({
          name: "",
          price: "",
          durationInDays: "",
          features: [
            "Shop Creation",
            "Product Sourcing/Hunting/listing",
            "Order Fulfillment",
          ],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Create a new Tier</Typography>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
            }}
          >
            Manage Plans
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Left Form Section */}
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Tier Name"
              fullWidth
              margin="normal"
              value={plan.name}
              onChange={(e) => setPlan({ ...plan, name: e.target.value })}
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={plan.price}
              onChange={(e) => setPlan({ ...plan, price: e.target.value })}
            />
            <TextField
              select
              label="Duration"
              variant="outlined"
              fullWidth
              margin="normal"
              value={plan.durationInDays}
              onChange={(e) =>
                setPlan({ ...plan, durationInDays: e.target.value })
              }
            >
              <MenuItem value="29">Monthly</MenuItem>
              <MenuItem value="365">Yearly</MenuItem>
            </TextField>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
              }}
            >
              <Typography variant="h6">Features</Typography>
              {featuresList.map((feature) => (
                <FormControlLabel
                  key={feature}
                  control={
                    <Switch
                      checked={plan.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      color="primary"
                    />
                  }
                  label={<Typography variant="body2">{feature}</Typography>}
                />
              ))}
            </Box>
          </Box>

          {/* Right Preview Section */}
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>

            <PlanCard plan={plan} />
            <Button
              variant="contained"
              onClick={handleCreatePlan}
              sx={{
                mt: 4,
                py: 1.5,
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                width: "40%",
                backgroundColor: loading ? "grey" : "primary.main",
              }}
              disabled={loading}
            >
              {loading ? "Adding..." : "ADD"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTier;
