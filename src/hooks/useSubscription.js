import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getCurrentSubscription } from "../reducer/authSlice";

const usePlan = () => {
  const plan = useSelector(getCurrentSubscription);

  return useMemo(() => plan, [plan]);
};

export default usePlan;
