import React from "react";
import WebsiteHeader from "./header";
import { Box } from "@mui/material";

const WebsiteLayout = ({ children, layout }) => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <WebsiteHeader layout={layout} />
      <Box component="main">{children}</Box>
    </Box>
  );
};

export default WebsiteLayout;
