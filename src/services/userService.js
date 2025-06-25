import api from "../utils/axios";

const buySubscription = async (payload) => {
  const response = await api.post("/user/buySubscription", payload);
  return response.data;
};

const getUserdata = async () => {
  const response = await api.get("/user/getUserData");
  return response.data;
};

const getMySubscription = async () => {
  const response = await api.get("/user/getMySubscription");
  return response.data;
};

const userService = { buySubscription, getUserdata, getMySubscription };

export default userService;
