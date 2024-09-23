import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const tokenApi = axios.create({
  baseURL: "http://192.168.0.17:3000/api/",
  withCredentials: true,
});

tokenApi.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

tokenApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (refreshToken) {
        const response = await tokenApi.post("/auth/refresh", {
          refreshToken,
        });
        SecureStore.setItemAsync("accessToken", response.data.accessToken);
        SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
        return tokenApi(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
