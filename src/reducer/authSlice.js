import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  subscription: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.subscription = action.payload.subscription;
    },
    clearUserData: (state) => {
      state.user = null;
      state.token = null;
      state.subscription = null;
    },
  },
});

export const getCurrentUser = (state) => state.auth.user;
export const getCurrentSubscription = (state) => state.auth.subscription;

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;
