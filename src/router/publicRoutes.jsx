import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import shopersService from "../services/shopersService";
import { templateRouters } from "./publicRouter.config";
import { Box, CircularProgress } from "@mui/material";
import NotFoundPage from "../components/pageNotFound";
import WebsiteLayout from "../pages/templates/layout";
import Cookies from "js-cookie";
import { setUserData } from "../reducer/authSlice";
import { useDispatch } from "react-redux";
import { setCart } from "../reducer/websiteSlice";
import templateTheme from "../pages/templates/templateTheme";
import { ThemeProvider } from "@mui/material/styles";

const PublicSites = ({ component }) => {
  const { subdomain } = useParams();
  const dispatch = useDispatch();

  const [storeData, setStoreData] = useState({
    template: null,
    layout: {},
    products: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        let storeResponse;
        let user;
        if (token) {
          [storeResponse, user] = await Promise.all([
            shopersService.getStore(subdomain),
            shopersService.getShoper(),
          ]);
          dispatch(setCart(user.data.cartItems));
          dispatch(setUserData({ user: user.data.shoper }));
        } else {
          storeResponse = await shopersService.getStore(subdomain);
        }

        const store = storeResponse?.store;
        if (store) {
          setStoreData({
            template: store,
            layout: parseLayoutSafely(store.layout),
            products: storeResponse.products || [],
          });
        }
      } catch (error) {
        console.error("Error fetching store:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [subdomain, dispatch]);

  // Avoid JSON.parse crashes
  const parseLayoutSafely = (layoutString) => {
    try {
      return JSON.parse(layoutString || "{}");
    } catch {
      return {};
    }
  };

  const matchedRoute = useMemo(() => {
    if (!storeData.template) return null;
    return (
      templateRouters.find((route) =>
        route?.key?.includes(String(storeData.template?.TemplateId))
      ) || templateRouters.find((route) => route?.key?.includes("eCommerce"))
    );
  }, [storeData.template]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "grid",
          placeContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (!matchedRoute) return <NotFoundPage />;

  const Component = component || matchedRoute.component;

  const componentProps = {
    template: storeData.template,
    layout: storeData.layout,
    products: storeData.products,
    subdomain,
  };

  return component ? (
    <ThemeProvider
      theme={templateTheme({
        primaryColor: storeData.layout.primaryColor,
        secondaryColor: storeData.layout.primaryColor,
        textColor: storeData.layout.textColor,
      })}
    >
      <WebsiteLayout layout={storeData.layout}>
        <Component {...componentProps} />
      </WebsiteLayout>
    </ThemeProvider>
  ) : (
    <ThemeProvider
      theme={templateTheme({
        primaryColor: storeData.layout.primaryColor,
        secondaryColor: storeData.layout.primaryColor,
        textColor: storeData.layout.textColor,
      })}
    >
      <Component {...componentProps} />
    </ThemeProvider>
  );
};

export default PublicSites;
