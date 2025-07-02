import api from "../utils/axios";

const getStore = async (subdomain) => {
  const response = await api.get(`shoper/getStoreProducts/${subdomain}`);
  return response.data;
};

const signUP = async (payload) => {
  const response = await api.post("/shoper/shoperSignUp", payload);
  return response.data;
};

const signIn = async (payload) => {
  const response = await api.post("/shoper/shoperLogin", payload);
  return response.data;
};

const getShoper = async () => {
  const response = await api.get(`/shoper/getShoper`);
  return response.data;
};

const addProductToCart = async (payload) => {
  const response = await api.post("/shoper/addToCart", payload);
  return response.data;
};

const updateProductToCart = async (payload) => {
  const response = await api.put("/shoper/updateCartItem", payload);
  return response.data;
};

const removeProductFromCart = async (productId) => {
  const response = await api.delete(`/shoper/removeCartItem/${productId}`);
  return response.data;
};

const getCart = async () => {
  const response = await api.get("/shoper/getCart");
  return response.data;
};

const checkout = async (payload) => {
  const response = await api.post("/shoper/checkout", payload);
  return response.data;
};

const shopersService = {
  getStore,
  signUP,
  signIn,
  addProductToCart,
  updateProductToCart,
  getShoper,
  removeProductFromCart,
  getCart,
  checkout,
};

export default shopersService;
