import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const HomePage = () => {
  const navigate = useNavigate();
  const access_token = Cookies.get("access_token");
  const user = localStorage.getItem("user");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (access_token && user) {
        navigate("/user/home/dashboard");
      } else {
        navigate("/auth/signin");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="welcome-page signup-page">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={400}
        mx="auto"
        px={2}
        py={4}
        sx={{
          fontFamily: "Open Sans",
        }}
      >
        <Typography
          variant="h1"
          className="shine-text"
          sx={{
            fontWeight: "bold",
            fontFamily: "Open Sans",
            fontSize: "4rem",
          }}
        >
          HivvHib
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Orienta", color: "#fff" }}
        >
          Transform your ideas
        </Typography>
      </Box>
    </section>
  );
};

export default HomePage;
