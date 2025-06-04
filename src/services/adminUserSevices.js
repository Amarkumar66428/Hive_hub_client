import api from "../utils/axios";

export const getAllInvites = async () => {
  const response = await api.get("/admin/getAllInvites");
  return response.data;
};

export const deleteInvite = async (id) => {
  const response = await api.delete(`admin/deleteInvite/${id}`);
  return response.data;
};

export const blockUnblockInvite = async (id) => {
  const response = await api.patch(`admin/blockUnblockInvite/${id}`);
  return response.data;
};
