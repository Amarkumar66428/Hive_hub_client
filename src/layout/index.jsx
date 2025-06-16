import React, { useState } from "react";
import Header from "./header";
import SideBar from "./sidebar";
import { Box } from "@mui/material";

const AppLayout = ({ children }) => {
  const [openSideBar, setSideBar] = useState(false);
  return (
    <Box position={"relative"}>
      <Header openSideBar={openSideBar} setSideBar={setSideBar}  />
      <Box display="flex">
        <SideBar openSideBar={openSideBar} setSideBar={setSideBar} />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
