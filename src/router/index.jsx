import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { authRouters, appRouters } from "./router.config";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { Box } from "@mui/material";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {authRouters.map(({ path, component }) => (
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
    </Routes>
  );
};

export default memo(AppRouter);
