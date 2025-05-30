import React from "react";
import Header from "./header";
import SideBar from "./sidebar";
import { Box } from "@mui/material";

const AppLayout = ({ children }) => {
  return (
    <Box>
      {/* <Header /> */}
      <Box display="flex">
        <SideBar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
