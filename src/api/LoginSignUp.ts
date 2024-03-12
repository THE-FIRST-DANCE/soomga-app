import axios from "axios";
import { API_URL } from "@env";

export const baseApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  responseType: "json",
});

export const getLogin = async (email: string, password: string) => {
  const response = await baseApi.post("/auth/signin", {
    email,
    password,
  });
  return response.data;
};

export const getSignup = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirm: string,
  birthDate: string
) => {
  const response = await baseApi.post("/auth/signup", {
    email,
    nickname,
    password,
    passwordConfirm,
    birthDate,
  });
  return response.data;
};
