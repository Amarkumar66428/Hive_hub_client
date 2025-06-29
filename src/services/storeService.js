import api from "../utils/axios";

const getStores = async () => {
  const response = await api.get("admin/getAllStores");
  return response.data;
};

const getPlans = async () => {
  const response = await api.get("/user/getAllPlans");
  return response.data;
};

const createStore = async (storeData) => {
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

const getMyStore = async () => {
  const response = await api.get("/user/getMyStoreWithProducts");
  return response.data;
};

const addItem = async ([item]) => {
  const formData = new FormData();

  Object.entries(item).forEach(([key, value]) => {
    if (key !== "images") {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : value
      );
    }
  });

  item.images?.forEach((file) => {
    if (file instanceof File) formData.append("images", file);
  });

  const response = await api.post("/user/createProduct", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const updateItem = async (id, data) => {
  const formData = new FormData();

  data.images?.forEach((file) => {
    if (file instanceof File) formData.append("images", file);
  });

  const updates = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "images") {
      updates[key] = value;
    }
  });

  formData.append("updates", JSON.stringify(updates));

  const response = await api.patch(`/user/updateProduct/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

const getMyInventory = async () => {
  const response = await api.get("/user/getMyInventory");
  return response.data;
};

const getAllOrders = async (params) => {
  const response = await api.get(`/user/getAllOrdersForStoreOwner${params}`);
  return response.data;
};

const storeService = {
  getStores,
  getPlans,
  createStore,
  getMyStore,
  addItem,
  updateItem,
  getMyInventory,
  getAllOrders,
};

export default storeService;
