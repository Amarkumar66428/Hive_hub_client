import api from "../utils/axios";

export const getStoreBySubdomain = async (subdomain) => {
  const response = await api.get(`/user/subdomain/${subdomain}`);
  return response.data;
};
