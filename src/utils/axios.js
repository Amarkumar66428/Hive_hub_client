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
    const token = Cookies.get("access_token") || Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("error::::::: ", error);
    return error;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status || 500;
    const code = error?.code || "ERR_INTERNAL";

    if ([403, 500, 502].includes(status)) {
      store.dispatch(
        setServerError({
          isError: true,
          code: status,
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
        })
      );
    }

    const formattedError = {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Internal Server Error",
      status,
      code,
    };

    return Promise.reject(formattedError);
  }
);

export default api;
