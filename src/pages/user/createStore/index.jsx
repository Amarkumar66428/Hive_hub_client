import React, { useEffect, useState } from "react";
import WelcomeScreen from "./welcomeScreen";
import TemplateSelector from "./selectTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserdata } from "../../../services/userService";
import { Box, CircularProgress } from "@mui/material";

const StorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screen = location.state?.screen;
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(screen || 1);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserdata();
      if (userData?.subscription?.isActive) {
        setSubscription(userData?.subscription);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate("/subscription/plans");
      }
    };
    fetchUserData();
  }, [navigate]);

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    subscription?.isActive &&
      {
        1: <WelcomeScreen onStart={() => setCurrentStep(2)} />,
        2: <TemplateSelector />,
      }[currentStep]
  );
};

export default StorePage;
