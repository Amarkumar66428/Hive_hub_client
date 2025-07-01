// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import serverErrorReducer from "./serverSlice";
import authReducer from "./authSlice";
import websiteReducer from "./websiteSlice";
// Combine all reducers
const rootReducer = combineReducers({
  serverError: serverErrorReducer,
  auth: authReducer,
  website: websiteReducer,
});

export default rootReducer;

// Export for potential future use
export { rootReducer };
