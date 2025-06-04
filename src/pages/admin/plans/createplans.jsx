import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlanCard from "../../../components/plansCards";
import { useSnackbar } from "../../../features/snackBar";
import { createPlan, updatePlan } from "../../../services/adminPlansServices";
import { ArrowBack } from "@mui/icons-material";

const featuresList = [
  "Shop Creation",
  "Product Sourcing/Hunting/listing",
  "Order Fulfillment",
  "Affiliate Reach out",
  "Product Promotions",
  "A.I Content Creation for Products",
  "Appealing Suspended Shops",
];

const CreateTier = ({ setOpen, selectPlan, setSelectPlan }) => {
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [plan, setPlan] = useState({
    name: selectPlan ? selectPlan.name : "",
    price: selectPlan ? selectPlan.price : "",
    offer: selectPlan ? selectPlan.offer : "",
    durationInDays: selectPlan ? selectPlan.durationInDays : "",
    features: selectPlan
      ? selectPlan.features
      : [
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
      plan.offer === "" ||
      plan.durationInDays === "" ||
      plan.features.length === 0
    ) {
      showSnackbar("Please fill all the fields", "error");
      return;
    }
    try {
      setLoading(true);
      let response;
      if (selectPlan?._id) {
        response = await updatePlan(selectPlan._id, plan);
      } else {
        response = await createPlan(plan);
      }
      if (response) {
        showSnackbar(
          selectPlan?._id
            ? "Plan updated successfully"
            : "Plan created successfully",
          "success"
        );
        setPlan({
          name: "",
          price: "",
          offer: "",
          durationInDays: "",
          features: [
            "Shop Creation",
            "Product Sourcing/Hunting/listing",
            "Order Fulfillment",
          ],
        });
        setSelectPlan(null);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectPlan(null);
    setOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log('name: ', name);

    if (name === "name") {
      // Restrict to 25 words - but don't block input harshly
      const words = value.trim().split(/\s+/);
      const trimmed = words.slice(0, 25).join(" ");
      setPlan((prev) => ({ ...prev, name: trimmed }));
    }else if (name === "price") {
      // Only allow numbers (no letters, no 'e', no dots)
      const isNumeric = /^\d{0,10}$/.test(value);
      if (isNumeric) {
        setPlan((prev) => ({ ...prev, price: value }));
      }
    } else if (name === "offer") {
      const isNumeric = /^\d{0,10}$/.test(value);
      if (isNumeric) {
        setPlan((prev) => ({ ...prev, offer: value }));
      }
    } else {
      setPlan((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{ padding: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
            <Typography variant="h4">Create a new Tier</Typography>
          </Box>
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
              name="name"
              label="Tier Name"
              placeholder="Enter Tier Name"
              fullWidth
              margin="normal"
              value={plan.name}
              onChange={(e) => handleOnChange(e)}
            />
            <TextField
              name="price"
              label="Price"
              placeholder="Enter Price in $"
              type="text"
              fullWidth
              margin="normal"
              value={plan.price}
              onChange={(e) => handleOnChange(e)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <TextField
              name="offer"
              label="Offer"
              placeholder="Enter Offer in %"
              type="text"
              fullWidth
              margin="normal"
              value={plan.offer}
              onChange={(e) => handleOnChange(e)}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            <TextField
              name="durationInDays"
              select
              label="Duration"
              variant="outlined"
              placeholder="Select Duration"
              fullWidth
              margin="normal"
              value={plan.durationInDays}
              onChange={(e) => handleOnChange(e)}
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

            <PlanCard plan={plan} size="large" />
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
              {loading
                ? selectPlan?._id
                  ? "Updating..."
                  : "Adding..."
                : selectPlan?._id
                ? "Update"
                : "Add"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateTier;
