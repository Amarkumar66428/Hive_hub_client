import api from "../utils/axios";

export const getStores = async () => {
  const response = await api.get("admin/getAllStores");
  return response.data;
};

export const createPlan = async (planData) => {
  const response = await api.post("/admin/createPlan", planData);
  return response.data;
};

export const getPlans = async () => {
  const response = await api.get("/user/getAllPlans");
  return response.data;
};

export const createStore = async (storeData) => {
  const formData = new FormData();
  for (const key in storeData) {
    if (key !== "logo") {
      formData.append(key, storeData[key]);
    }
  }
  if (storeData.logo && storeData.logo instanceof File) {
    formData.append("logo", storeData.logo);
  }
  const response = await api.post("/user/createStore", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const addItem = async (items) => {
  const formData = new FormData();

  const itemsWithoutImages = items.map(({ image, ...rest }) => rest);

  formData.append("items", JSON.stringify(itemsWithoutImages));

  items.forEach(({ image }, idx) => {
    if (image && image instanceof File) {
      formData.append(`itemImage${idx}`, image);
    }
  });
  const response = await api.post("/user/createProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
