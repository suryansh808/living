import axios from "axios";

const apiClient = axios.create({
  timeout: 15000,
});

// Global response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
