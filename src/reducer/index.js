// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import serverErrorReducer from "./serverSlice";
import authReducer from "./authSlice";
// Combine all reducers
const rootReducer = combineReducers({
  serverError: serverErrorReducer,
  auth: authReducer,
});

export default rootReducer;

// Export for potential future use
export { rootReducer };
