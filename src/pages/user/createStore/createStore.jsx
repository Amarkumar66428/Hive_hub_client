import React, { useState } from "react";
import { Box } from "@mui/material";
import Template from "../../templates/templates1";
import ToolsPanel from "./toolpanel";

const initialProjectConfig = {
  name: "",
  description: "",
  subdomain: "",
  logo: null,
};

const initialItem = {
  title: "",
  description: "",
  price: "",
  sku: "",
  category: "",
  tags: [],
  image: null,
};

const CreateStore = ({ previousStep }) => {
  const [projectConfig, setProjectConfig] = useState(initialProjectConfig);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [tagInput, setTagInput] = useState("");
  return (
    <Box display="flex" flexDirection="row" height="100%" minHeight="100vh">
      {/* Tools Panel (4/12) */}
      <ToolsPanel
        previousStep={previousStep}
        projectConfig={projectConfig}
        setProjectConfig={setProjectConfig}
        items={items}
        setItems={setItems}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
        tagInput={tagInput}
        setTagInput={setTagInput}
      />

      {/* Preview Panel (8/12) */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
        }}
      >
        <Template projectConfig={projectConfig} items={items} />
      </Box>
    </Box>
  );
};

export default CreateStore;
