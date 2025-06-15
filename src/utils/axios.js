import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../app/store";
import { setServerError } from "../reducer/serverSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("error::::::: ", error);
    return;
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ([401, 403, 500, 502, 504]?.includes(error?.response?.status)) {
      store.dispatch(
        setServerError({
          isError: true,
          code: error?.response?.status || 500,
          message: error?.response?.data?.message || "Internal Server Error",
        })
      );
    }
    if (["ECONNABORTED", "ECONNREFUSED"].includes(error?.code)) {
      store.dispatch(
        setServerError({
          isError: true,
          code: 500,
          message: "Internal Server Error",
        })
      );
    }
    return Promise.reject(error);
  }
);

export default api;
