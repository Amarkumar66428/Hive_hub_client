import api from "../utils/axios";

export const createPlan = async (planData) => {
  const response = await api.post("/admin/createPlan", planData);
  return response.data;
};

export const updatePlan = async (planId, planData) => {
  const response = await api.patch(`/admin/updatePlan/${planId}`, planData);
  return response.data;
};

export const deletePlan = async (planId) => {
  const response = await api.delete(`/admin/deletePlan/${planId}`);
  return response.data;
};

export const getAdminPlans = async () => {
  const response = await api.get(`/admin/getAllPlans`);
  return response.data;
};

export const activateORDeactivatePlan = async (planId) => {
  const response = await api.patch(`/admin/activateORDeactivatePlan/${planId}`);
  return response.data;
};

const adminPlansServices = {
  createPlan,
  updatePlan,
  deletePlan,
  getAdminPlans,
  activateORDeactivatePlan,
};

export default adminPlansServices;  
