// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userAuth/userAuthSlice';
import otherReducer from '../features/otherFeature/otherSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    other: otherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
