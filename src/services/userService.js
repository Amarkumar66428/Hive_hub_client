import api from "../utils/axios";

export const buySubscription = async (payload) => {
  const response = await api.post("/user/buySubscription", payload);
  return response.data;
};

export const getUserdata = async () => {
  const response = await api.get("/user/getUserData");
  return response.data;
};

