// src/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/accounts/";

const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// --- Request interceptor to attach access token ---
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Refresh logic for 401 responses ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if no response or not 401, reject
    if (!error.response || error.response.status !== 401) return Promise.reject(error);

    // avoid infinite loop
    if (originalRequest._retry) return Promise.reject(error);
    originalRequest._retry = true;

    // if already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(API(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      // no refresh token — logout client
      isRefreshing = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      // Use axios (raw) to avoid using interceptors here
      const resp = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken }, {
        headers: { "Content-Type": "application/json" },
      });

      const newAccess = resp.data.access;
      // optional: some setups may return new refresh token
      if (resp.data.refresh) {
        localStorage.setItem("refresh", resp.data.refresh);
      }
      localStorage.setItem("token", newAccess);

      processQueue(null, newAccess);
      isRefreshing = false;

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;
      return API(originalRequest);
    } catch (err) {
      processQueue(err, null);
      isRefreshing = false;
      // refresh failed -> clear tokens & redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(err);
    }
  }
);

export default API;
