// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/index.js';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
