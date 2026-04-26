import { authApi } from "./services/auth/authApiSlice";
import { categoryApi } from "./services/category/categorySlice";
import { bannerApi } from "./services/banner/bannerSlice";

export const apiReducer = {
  // REACT QUERY REDUCER
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [bannerApi.reducerPath]: bannerApi.reducer,
};

export const apiMiddleware = [
  authApi.middleware,
  categoryApi.middleware,
  bannerApi.middleware,
];
