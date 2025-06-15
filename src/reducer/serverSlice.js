// src/features/userAuth/userAuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  code: null,
  message: null,
  isLoading: false,
  lastErrorTime: null,
};

const serverError = createSlice({
  name: "serverError",
  initialState,
  reducers: {
    setServerError: (state, action) => {
      state.isError = action.payload.isError;
      state.code = action.payload.code;
      state.message = action.payload?.message || "Internal Server Error";
      state.lastErrorTime = new Date().toISOString();
    },
    clearServerError: (state) => {
      state.isError = false;
      state.code = null;
      state.message = null;
      state.lastErrorTime = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetServerState: () => initialState,
  },
});

export const { setServerError, clearServerError, setLoading, resetServerState } =
  serverError.actions;

export default serverError.reducer;
