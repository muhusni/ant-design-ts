import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // 🔥 Ensures cookies are sent with requests
});

export default API;
