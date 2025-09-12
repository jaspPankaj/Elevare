// src/api.js
import axios from "axios";
import { ACCESS_TOKEN } from "./token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

// Attach tokens
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const googleAccessToken = localStorage.getItem("GOOGLE_ACCESS_TOKEN");
    if (googleAccessToken) {
      config.headers["X-Google-Access-Token"] = googleAccessToken; // ✅ correct
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
