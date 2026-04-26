"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

const TOKEN_OPTIONS = { expires: 7, sameSite: "strict", path: "/" };
const USER_OPTIONS = { expires: 7, sameSite: "strict", path: "/" };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate user from cookie on mount
  useEffect(() => {
    const storedUser = Cookies.get("USER");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        Cookies.remove("USER", { path: "/" });
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (response) => {
    if (!response) return;

    // --- token ---
    const token = response.token ?? response.accessToken ?? null;

    // --- user data ---
    const userData = response.data ?? response.user ?? null;

    if (!token || !userData) {
      console.warn(
        "[AuthProvider] login() – missing token or user data.",
        response,
      );
      return;
    }

    // Persist token
    Cookies.set("TOKEN", token, TOKEN_OPTIONS);

    // Persist user profile
    Cookies.set("USER", JSON.stringify(userData), USER_OPTIONS);

    setUser(userData);
  };

  // Update the token
  const updateToken = (newToken) => {
    if (!newToken) return;
    Cookies.set("TOKEN", newToken, TOKEN_OPTIONS);
  };

  /** Clear every auth cookie and reset React state */
  const logout = () => {
    Cookies.remove("TOKEN", { path: "/" });
    Cookies.remove("USER", { path: "/" });
    setUser(null);
  };

  const getToken = () => Cookies.get("TOKEN") ?? null;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, getToken, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
