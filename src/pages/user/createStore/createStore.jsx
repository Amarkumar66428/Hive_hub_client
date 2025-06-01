import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, Button, Typography, CircularProgress } from "@mui/material";
import { ArrowBack, Publish } from "@mui/icons-material";
import Template from "../../templates/templates1";
import { createStore } from "../../../services/storeService";
import { useSnackbar } from "../../../features/snackBar";

const CreateStore = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const template = state?.template;
  console.log("template: ", template);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handlePublish = async () => {
    try {
      setLoading(true);

      const storeData = {
        name: template.title,
        subdomain: template.subdomain,
        templateId: template?.id,
        logo: template.icon, // pass File if available
      };

      const response = await createStore(storeData);

      if (response) {
        showSnackbar("Store created successfully", "success");
        navigate("/user/home/create-store", { state: { screen: 2 } });
      }
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        p={2}
        height={60}
        bgcolor="background.paper"
        sx={{
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate("/user/home/create-store", {
                state: {
                  screen: 2,
                },
              })
            }
            startIcon={<ArrowBack />}
          >
            Back
          </Button>
          <Typography variant="h5">Create Own Store</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={handlePublish}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} sx={{ color: "success.main" }} /> : <Publish />}
          >
            {loading ? "Publishing..." : "Publish"}
          </Button>
        </Box>
      </Stack>
      <Box
        sx={{
          height: `calc(100vh - 60px)`,
          overflow: "auto",
        }}
      >
        <Template template={template} />
      </Box>
    </Box>
  );
};

export default CreateStore;
