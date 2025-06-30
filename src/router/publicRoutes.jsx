import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import shopersService from "../services/shopersService";
import { templateRouters } from "./publicRouter.config";
import { Box } from "@mui/material";
import NotFoundPage from "../components/pageNotFound";
import PublicAppLoader from "../components/publicAppLoader";

const PublicSites = () => {
  const { subdomain } = useParams();
  const [template, setTemplate] = useState(null);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await shopersService.getStore(subdomain);
        console.log("response: ", response);
        if (response?.store) {
          const store = response.store;
          setLayout(JSON.parse(store.layout || "{}"));
          setTemplate(store);
        }
      } catch (error) {
        console.log("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [subdomain]);

  if (loading) {
    return (
      <Box
        sx={{
          margin: 0,
          height: "100vh",
          display: "grid",
          placeContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <PublicAppLoader subdomain={subdomain} />
      </Box>
    );
  }

  console.log("templateRouters: ", templateRouters);

  const matchedRoute = template?.TemplateId
    ? templateRouters.find((route) =>
        route?.key?.includes(String(template.TemplateId))
      )
    : null;

  console.log("matchedRoute: ", matchedRoute);

  if (!matchedRoute) {
    return <NotFoundPage />;
  }

  const Component = matchedRoute.component;
  return <Component template={template} layout={layout} />;
};

export default PublicSites;
