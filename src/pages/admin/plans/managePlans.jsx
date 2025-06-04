import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { getPlans } from "../../../services/storeService";
import PlanCard from "../../../components/plansCards";
import { BorderColorOutlined, DeleteOutlined, SettingsOutlined } from "@mui/icons-material";

const ManagePlans = ({ setOpen }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectPlan, setSelectPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getPlans();
        setPlans(response?.plans);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Manage Plans</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create Plan
        </Button>
      </Box>
      <Box sx={{ width: "100%", minHeight: "60vh", py: 4 }}>
        {loading ? (
          // Loading State
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : plans.length === 0 ? (
          // Empty State
          <Box
            sx={{
              textAlign: "center",
              py: 5,
            }}
          >
            <Typography variant="h5" color="text.secondary">
              No plans found
            </Typography>
          </Box>
        ) : (
          // Data Grid
          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid key={plan._id} item xs={12} sm={6} md={4}>
                <PlanCard
                  plan={plan}
                  selectPlan={selectPlan}
                  setSelectPlan={setSelectPlan}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: "2em",
          left: 0,
          right: 0,
          backgroundColor: "#000",
          padding: 2,
          width: "20%",
          borderRadius: "50px",
          margin: "auto",
        }}
      >
        <List
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            padding: 0,
            margin: 0,
          }}
        >
          <ListItem sx={{ padding: 0, justifyContent: "center" }}>
            <IconButton sx={{ borderRadius: "50%" }}>
              <BorderColorOutlined sx={{ color: "white", fontSize: "1.4em" }} />
            </IconButton>
          </ListItem>
          <ListItem sx={{ padding: 0, justifyContent: "center" }}>
            <IconButton sx={{ borderRadius: "50%" }}>
              <DeleteOutlined sx={{ color: "white", fontSize: "1.4em" }} />
            </IconButton>
          </ListItem>
          <ListItem sx={{ padding: 0, justifyContent: "center" }}>
            <IconButton sx={{ borderRadius: "50%" }}>
              <SettingsOutlined sx={{ color: "white", fontSize: "1.4em" }} />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default ManagePlans;
