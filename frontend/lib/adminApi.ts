import axios from "axios";
import Cookies from "js-cookie";

const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Attach token from cookie on every request
adminApi.interceptors.request.use((config) => {
  const token = Cookies.get("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("admin_token");
      window.location.href = "/admin/login";
    }
    const message =
      error.response?.data?.message ?? error.message ?? "An error occurred";
    return Promise.reject(new Error(message));
  }
);

export default adminApi;
