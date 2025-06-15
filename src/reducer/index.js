// src/app/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import serverErrorReducer from "./serverSlice";
// Combine all reducers
const rootReducer = combineReducers({
  serverError: serverErrorReducer,
});

export default rootReducer;

// Export for potential future use
export { rootReducer };
