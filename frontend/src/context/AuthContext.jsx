// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load user profile if token exists
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await API.get("profile/"); // expected protected endpoint
      setUser(res.data);
    } catch (err) {
      console.error("Could not load user:", err);
      // If 401 happens, API interceptor will handle refresh. We keep user null for now.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // login -> store tokens and load user
  const login = async (username, password) => {
    try {
      const res = await API.post("login/", { username, password });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      await loadUser();
      toast.success("Logged in");
      return { success: true };
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
      return { success: false, error: err };
    }
  };

  // logout -> call backend blacklist (optional) and clear storage
  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await API.post("logout/", { refresh });
      }
    } catch (err) {
      console.warn("Logout API failed (ignore in dev)", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
