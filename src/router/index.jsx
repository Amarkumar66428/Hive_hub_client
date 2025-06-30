import React, { memo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { authRouters, appRouters } from "./router.config";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { Box } from "@mui/material";
import NotFoundPage from "../components/pageNotFound";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";
import { SUPER_ADMIN } from "../constant/LookupConst";
import { clearUserData } from "../reducer/authSlice";
import { useDispatch } from "react-redux";
import { publicRouters } from "./publicRouter.config";

const Authorization = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const access_token = Cookies.get("access_token");
  const userRole = useAuth()?.role;

  const redirectPath =
    userRole === SUPER_ADMIN ? "/admin/dashboard" : "/user/dashboard";

  if (access_token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  } else if (window.location.pathname === "/") {
    localStorage.clear();
    Cookies.remove("access_token");
    dispatch(clearUserData());
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
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
