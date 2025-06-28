import Axios from "axios";
import { R_TOKEN } from "@/utils/constants";

const baseURL =
  import.meta.env.VITE_BASE_API_URL || "https://be-complaints.vercel.app/api";

const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(R_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Redirect ke login jika token expired (401)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token expired, redirecting to login...");

      localStorage.removeItem(R_TOKEN);
      localStorage.removeItem("user_data");

      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
  }
);

export default axios;
