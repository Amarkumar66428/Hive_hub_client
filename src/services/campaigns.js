import api from "../utils/axios";

const getCampaigns = async (payload) => {
  const response = await api.get("/user/getMyCampaigns", payload);
  return response.data;
};

const createCampaign = async (payload) => {
  const response = await api.post("/user/createCampaign", payload);
  return response.data;
};

const campaignsService = {
  getCampaigns,
  createCampaign,
};

export default campaignsService;
