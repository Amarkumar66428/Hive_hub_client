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
