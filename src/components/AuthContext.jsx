import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // current logged-in user
  const [loading, setLoading] = useState(true);

  // Load tokens & user from localStorage on mount
  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    const username = localStorage.getItem("username");

    if (access && refresh) {
      setUser({ username });
    }
    setLoading(false);
  }, []);

  // --- LOGIN ---
  const login = async (username, password) => {
    const res = await api.post("login/", { username, password });

    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    localStorage.setItem("username", username);
    setUser({ username });
  };

  const googleLogin = (googleUser) => {
  setUser({
    username: googleUser.name,
    email: googleUser.email,
    picture: googleUser.picture,
  });
};


  // --- REGISTER ---
  const register = async (formData) => {
    await api.post("register/", formData);
    // optionally call login() after register
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setUser(null);
    window.location.href = "/";
  };

  const value = {
    user,
    login,
    register,
    logout,
    googleLogin,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook for easy use
export const useAuth = () => useContext(AuthContext);
