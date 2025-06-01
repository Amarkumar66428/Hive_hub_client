import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import Template from "../../templates/templates1";
import Templates2 from "../../templates/templates2";
import Templates3 from "../../templates/templates3";
import { ArrowBack } from "@mui/icons-material";

const TEMPLATES = {
  1: <Template />,
  2: <Templates2 />,
  3: <Templates3 />,
};

const PreviewTemplate = ({ setCurrentStep, selectedTemplate }) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={2} p={2} height={60}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentStep(2)}
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
        <Typography variant="h5">Preview Template</Typography>
      </Stack>
      <Box
        sx={{
          height: `calc(100vh - 60px)`,
          overflow: "auto",
        }}
      >
        {TEMPLATES[selectedTemplate?.id]}
      </Box>
    </Box>
  );
};

export default PreviewTemplate;
