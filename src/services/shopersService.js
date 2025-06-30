import api from "../utils/axios";

const getStore = async (subdomain) => {
  const response = await api.get(`shoper/getStoreProducts/${subdomain}`);
  return response.data;
};

const shopersService = {
  getStore,
};

export default shopersService;
