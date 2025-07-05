import { Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import useAuth from "../hooks/useAuth";
import usePlan from "../hooks/useSubscription";
import userService from "../services/userService";
import adminService from "../services/adminService";
import { setUserData } from "../reducer/authSlice";
import { decryptData } from "../utils/encryption";
import AppLoading from "../pages/hiveloading";

const ProtectedRoute = ({
  children,
  role = [],
  subscriptionRequired = false,
}) => {
  const { phn_token } = useParams();

  if (phn_token) {
    Cookies.set("access_token", phn_token);
  }

  const location = useLocation();
  const dispatch = useDispatch();
  const token = Cookies.get("access_token");
  const user = useAuth();
  const plan = usePlan();

  const [loading, setLoading] = useState(!user && !!token);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedRole = localStorage.getItem("role");
        const decryptedRole = storedRole ? decryptData(storedRole) : null;

        if (decryptedRole === "admin") {
          const res = await adminService.getAdminData();
          if (res?.data) {
            dispatch(setUserData({ user: res.data }));
          }
        } else {
          const res = await userService.getUserdata();
          if (res?.user) {
            dispatch(
              setUserData({
                user: res.user,
                subscription: res.subscription,
              })
            );
          }
        }
      } catch (error) {
        console.error("User fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user && token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user, token, dispatch]);

  const isAuthenticated = !!token && role.includes(user?.role);
  const isSubscribed = plan?.isActive;

  if (loading) return <AppLoading />;

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  if (!role.length) {
    return <Navigate to="/exception?type=401" replace />;
  }

  if (subscriptionRequired && !isSubscribed) {
    return <Navigate to="/subscription/plans" replace />;
  }

  return children;
};

export default ProtectedRoute;
