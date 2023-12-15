import axios from 'axios';
import {getCookie} from "../const/auth"

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Modify the request config, e.g., add headers
    const token = getCookie('token');
console.log(token,"clientside--token")

    if (token) {
    config.headers['authorization'] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

