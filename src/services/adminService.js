import api from "../utils/axios";

export const createInviteCode = async (payload) => {
  const response = await api.post("/admin/createInviteCode", payload);
  return response.data;
};

export const approveStore = async (storeId) => {
  const response = await api.patch(`admin/approveStore/${storeId}/approve`);
  return response.data;
};

export const blockStore = async (storeId) => {
  const response = await api.post(`admin/approveStore/${storeId}/block`);
  return response.data;
};
