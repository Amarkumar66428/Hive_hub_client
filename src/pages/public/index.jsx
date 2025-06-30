import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Template from "../templates/templates1";
import { Box, CircularProgress } from "@mui/material";
import Templates2 from "../templates/templates2";
import shopersService from "../../services/shopersService";

const PublicSite = () => {
  const { subdomain } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await shopersService.getStore(subdomain);
        console.log("response: ", response);
        if (response?.store) {
          setLayout(JSON.parse(response.store.layout) || response.store.layout);
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
    return (
      {
        1: <Templates2 layout={layout} />,
        2: <Template layout={layout} />,
      }[template?.TemplateId] || null
    );
  }
};

export default PublicSite;
