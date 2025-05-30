import { API_URL } from "../constants";
import { errorToast } from "../helpers";
import { resetAuth } from "../reducers/authSlice";
import { STORAGE_KEYS, getData, removeData } from "../constant/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getData(STORAGE_KEYS?.token);
    const environment = getData(STORAGE_KEYS?.environment);
    const userData = getData(STORAGE_KEYS?.userData);
    headers.set("Content-Type", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      if (userData?.role === 1) {
        headers.set("environment", environment ?? "test");
      }
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(resetAuth());
    if (window) {
      window.location.href = "/";
    }
    removeData(STORAGE_KEYS.token);
    removeData(STORAGE_KEYS.userData);
    removeData(STORAGE_KEYS.prod_bot_id);
    errorToast("Session Expired");
  }

  // if (result?.error?.status === 500) {
  //     api.dispatch({ type: "UNKNOWN_ERROR" });
  //     window.location.href = "/login";
  //     errorToast("Something went wrong");
  // }

  // if (result?.error?.status === 502) {
  //     api.dispatch({ type: "UNKNOWN_ERROR" });
  //     window.location.href = "/login";
  //     errorToast("Something went wrong");
  // }

  // if (result.error?.error && result?.error?.status === 502) {
  //     errorToast('Server error!');
  //     window.location.href = "/login";
  // } else if (result.error?.error) {
  //     errorToast(
  //         // result?.error?.error?.replace('TypeError: ', '') ||
  //         'Something went wrong!',
  //     );
  //     window.location.href = "/login";
  // }

  return result;
};

const emptySplitApi = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints: () => ({}),
});

export default emptySplitApi;