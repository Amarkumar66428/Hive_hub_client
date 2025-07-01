import api from "../utils/axios";

const getStore = async (subdomain) => {
  const response = await api.get(`shoper/getStoreProducts/${subdomain}`);
  return response.data;
};

const signUP = async (payload) => {
  const response = await api.post("/shoper/shoperSignUp", payload);
  return response.data;
};

const signIn = async (payload) => {
  const response = await api.post("/shoper/shoperLogin", payload);
  return response.data;
};

const shopersService = {
  getStore,
  signUP,
  signIn,
};

export default shopersService;
