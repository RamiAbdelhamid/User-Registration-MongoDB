import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Set your backend URL
  withCredentials: true, // Enable sending cookies
});
