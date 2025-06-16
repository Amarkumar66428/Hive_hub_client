import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../reducer/authSlice";

const useAuth = () => {
  const user = useSelector(getCurrentUser);

  return useMemo(() => user, [user]);
};

export default useAuth;
