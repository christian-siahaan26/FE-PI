import Axios from "axios";
import { LS_TOKEN } from "../utils/constants";

const baseURL =
  import.meta.env.VITE_BASE_API_URL || "https://be-pi-complaint.vercel.app/api";
  
const axios = Axios.create({
  baseURL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(LS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  } else {
    // hapus Content-Type supaya axios otomatis set multipart/form-data
    delete config.headers["Content-Type"];
  }

  return config;
});

export default axios;
