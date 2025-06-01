import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Template from "../templates/templates1";
import { getStoreBySubdomain } from "../../services/publicSerive";
import { Box, CircularProgress, Typography } from "@mui/material";

const PublicSite = () => {
  const { subdomain } = useParams();
  const [template, setTemplate] = useState(null);
  console.log("template: ", template);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await getStoreBySubdomain(subdomain);
        console.log(response);
        if (response?.store) {
          setTemplate(response.store);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [subdomain]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return <Template template={template} />;
  }
};

export default PublicSite;
