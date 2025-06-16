// components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";
import usePlan from "../hooks/useSubscription";
import { useEffect } from "react";
import userService from "../services/userService";
import { useDispatch } from "react-redux";
import { setUserData } from "../reducer/authSlice";

const ProtectedRoute = ({ children, role, subscriptionRequired }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = Cookies.get("access_token");
  const user = useAuth();
  console.log('user: ', user);
  const isSubscribed = usePlan()?.isActive;
  console.log('isSubscribed: ', isSubscribed);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await userService.getUserdata();
        if (userData) {
          const user = {
            user: userData?.subscription,
            subscription: userData?.subscription,
          };
          dispatch(setUserData(user));
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!user) {
      getUserData();
    }
  }, [user]);

  const isAuthenticated = !!accessToken && user?.role === role[0];

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
