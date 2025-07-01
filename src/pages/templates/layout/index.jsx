import React from "react";
import WebsiteHeader from "./header";
import { Box } from "@mui/material";

const WebsiteLayout = ({ children }) => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa"}}>
      <WebsiteHeader />
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
};

export default WebsiteLayout;
