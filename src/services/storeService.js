import api from "../utils/axios";

export const getStores = async () => {
  const response = await api.get("admin/getAllStores");
  return response.data;
};

export const getPlans = async () => {
  const response = await api.get("/user/getAllPlans");
  return response.data;
};

export const createStore = async (storeData) => {
  const formData = new FormData();

  // Append all fields except 'logo'
  Object.entries(storeData).forEach(([key, value]) => {
    if (key !== "logo") {
      formData.append(key, value);
    }
  });

  // Append 'logo' only if it's a valid File
  if (storeData.logo instanceof File) {
    formData.append("logo", storeData.logo);
  }

  try {
    const response = await api.post("/user/createStore", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // Optional: centralized error logging
    console.error("Create Store API failed:", error);
    throw error;
  }
};

export const getMyStore = async () => {
  const response = await api.get("/user/getMyStoreWithProducts");
  return response.data;
};

export const addItem = async (items) => {
  const formData = new FormData();

  // Add item data (excluding image field) as JSON
  const itemsData = items.map(({ image, ...rest }) => rest);
  formData.append("items", JSON.stringify(itemsData));

  // Append images if available
  items.forEach(({ image }) => {
    if (image instanceof File) {
      formData.append(`images`, image);
    }
  });

  const response = await api.post("/user/createProduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const getMyInventory = async () => {
  const response = await api.get("/user/getMyInventory");
  return response.data;
};

const storeService = {
  getStores,
  getPlans,
  createStore,
  getMyStore,
  addItem,
  getMyInventory,
};

export default storeService;
