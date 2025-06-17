import React, { memo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { authRouters, appRouters, publicRouters } from "./router.config";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { Box } from "@mui/material";
import NotFoundPage from "../components/pageNotFound";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";
import { SUPER_ADMIN } from "../constant/LookupConst";

const Authorization = ({ children }) => {
  const location = useLocation();
  const access_token = Cookies.get("access_token");
  const userRole = useAuth()?.role;

  const redirectPath =
    userRole === SUPER_ADMIN
      ? "/admin/home/dashboard"
      : "/user/home/dashboard";

  if (access_token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {authRouters.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Authorization>{React.createElement(component)}</Authorization>
          }
        />
      ))}
      {publicRouters.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={React.createElement(component)}
        />
      ))}

      {/* Protected Routes with Optional Layout */}
      {appRouters.map(
        ({ path, component, isLayout, role, subscriptionRequired }) => {
          const content = React.createElement(component);
          const wrappedContent = isLayout ? (
            <AppLayout>
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  backgroundColor: "#f9fafb",
                  overflow: "auto",
                }}
              >
                {content}
              </Box>
            </AppLayout>
          ) : (
            content
          );

          return (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute
                  role={role}
                  subscriptionRequired={subscriptionRequired}
                >
                  {wrappedContent}
                </ProtectedRoute>
              }
            />
          );
        }
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default memo(AppRouter);