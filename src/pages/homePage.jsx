import { Box, Typography } from "@mui/material";

const HomePage = () => {

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
