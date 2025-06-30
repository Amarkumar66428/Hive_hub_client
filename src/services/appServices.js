import api from "../utils/axios";

const uploadImage = async (image) => {
  const formData = new FormData();

  if (image instanceof File) {
    formData.append("files", image);
  }

  try {
    const response = await api.post("/user/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Create Store API failed:", error);
    throw error;
  }
};

const appServices = { uploadImage };

export default appServices;
