// src/features/userAuth/userAuthSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {},
  wishlist: [],
  orders: [],
  user: null,
  products: [],
  categories: [],
  subcategories: [],
};

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
  },
});

export const {
  setCart,
  setWishlist,
  setOrders,
  setUser,
  setProducts,
  setCategories,
  setSubcategories,
} = websiteSlice.actions;

export default websiteSlice.reducer;
