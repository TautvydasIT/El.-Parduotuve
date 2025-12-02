// src/api.jsx
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // ✅ ensures cookies (refresh token) are sent
});

// Request interceptor → attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor → update access token if backend rotated it
api.interceptors.response.use(
  (response) => {
    const newAccess = response.headers["x-access-token"];
    if (newAccess) {
      localStorage.setItem("token", newAccess);
    }
    return response;
  },
  (error) => {
    // Optionally handle 401 globally
    if (error.response?.status === 401) {
      // You could redirect to login or show a modal
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
