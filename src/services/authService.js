import api from "../utils/axios";

// Example: POST request to /user/sign
export const signUp = async (userData) => {
  const response = await api.post("/user/signup", userData);
  return response.data;
};

export const signIn = async (userData) => {
  const response = await api.post("/user/login", userData);
  return response.data;
};



