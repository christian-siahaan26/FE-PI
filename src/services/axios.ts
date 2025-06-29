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

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem(R_TOKEN);
      localStorage.removeItem("user_data");

      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

export default axios;
