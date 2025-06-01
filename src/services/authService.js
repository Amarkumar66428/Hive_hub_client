import api from "../utils/axios";

// Example: POST request to /user/sign
export const adminSignIn = async (payload) => {
  const response = await api.post("/admin/signInAdmin", payload);
  return response.data;
};

export const signUp = async (payload) => {
  const response = await api.post("/user/signup", payload);
  return response.data;
};

export const signIn = async (payload) => {
  const response = await api.post("/user/login", payload);
  return response.data;
};



