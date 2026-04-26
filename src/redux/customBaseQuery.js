import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const BASE_URL = "https://api-stage-ecommerce-clicon.vercel.app";

/** Read TOKEN cookie */
const getToken = () => {
  const raw = Cookies.get("TOKEN");
  return raw ? raw.replace(/"/g, "") : null;
};

/** Clear cookies on logout */
const clearAuthCookies = () => {
  Cookies.remove("TOKEN", { path: "/" });
  Cookies.remove("USER", { path: "/" });
};

/** Persist a token */
const saveToken = (token) => {
  Cookies.set("TOKEN", token, { expires: 7, sameSite: "strict", path: "/" });
};

// Base query
const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});
// Custom base query
export const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const { status } = result.error;

    if (status === 401) {
      const isLogin = typeof args === "string" ? args.includes("/login") : args?.url?.includes("/login");
      
      if (!isLogin) {
        return {
          error: {
            status: 401,
            data: { message: "Your session has expired. Please login again." },
          },
        };
      }
    } else if (status === 500) {
      console.log("Server Error (500)");
    } else {
      console.log("API Error:", result.error);
    }
  }

  return result;
};
