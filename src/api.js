import axios from "axios";

const api = axios.create({
  baseURL: "https://elevarebackend-v13q.onrender.com/api/",
  // baseURL: "http://127.0.0.1:8000/api/"
});

// Attach access token before every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 (expired access token) and refresh automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
          const res = await api.post("/token/refresh/", {
            refresh: refresh,
          });

          // Save new tokens
          localStorage.setItem("access_token", res.data.access);

          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh also failed → logout user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
