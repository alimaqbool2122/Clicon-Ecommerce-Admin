import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiReducer, apiMiddleware } from "./ApiController";

const rootReducer = combineReducers({
  ...apiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([...apiMiddleware]),
});
