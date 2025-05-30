// components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, role, subscriptionRequired }) => {
  const location = useLocation();
  const accessToken = Cookies.get("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isSubscribed = JSON.parse(localStorage.getItem("isSubscribed"));

  const isAuthenticated = !!accessToken && user.role === role[0];

  if (!isAuthenticated) {
    const path = "/auth/signin";
    return <Navigate to={path} state={{ from: location }} replace />;
  }

  if (subscriptionRequired && !isSubscribed) {
    return <Navigate to="/subscription/plans" replace />;
  }

  if (!role) {
    return <Navigate to="/exception?type=401" replace />;
  }

  return children;
};

export default ProtectedRoute;
