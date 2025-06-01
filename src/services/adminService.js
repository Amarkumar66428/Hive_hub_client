import api from "../utils/axios";

export const createInviteCode = async (payload) => {
  const response = await api.post("/admin/createInviteCode", payload);
  return response.data;
};
