import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import usePlan from "../hooks/useSubscription";
import userService from "../services/userService";
import { setUserData } from "../reducer/authSlice";
import AppLoading from "../pages/hiveloading";

const ProtectedRoute = ({ children, role = [], subscriptionRequired = false }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = Cookies.get("access_token");
  const user = useAuth();
  const plan = usePlan();

  const [loading, setLoading] = useState(!user && !!token);

  useEffect(() => {
    if (!user && token) {
      userService.getUserdata()
        .then((data) => {
          if (data) {
            dispatch(setUserData({
              user: data?.user,
              subscription: data.subscription,
            }));
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token, dispatch]);

  const isAuthenticated = !!token && role.includes(user?.role);
  const isSubscribed = plan?.isActive;

  if (loading) return <AppLoading />; // or a small loader component

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (subscriptionRequired && !isSubscribed) {
    return <Navigate to="/subscription/plans" replace />;
  }

  if (!role.length) {
    return <Navigate to="/exception?type=401" replace />;
  }

  return children;
};

export default ProtectedRoute;
