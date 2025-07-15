import api from "../utils/axios";

const getCampaigns = async (payload) => {
  const response = await api.get("/user/getMyCampaigns", payload);
  return response.data;
};

const createCampaign = async (payload) => {
  const response = await api.post("/user/createCampaign", payload);
  return response.data;
};

const updateCampaignStatus = async (campaignId, body) => {
  const response = await api.put(
    `user/updateCampaignStatus/${campaignId}`,
    body
  );
  return response.data;
};

const campaignsService = {
  getCampaigns,
  createCampaign,
  updateCampaignStatus,
};

export default campaignsService;
