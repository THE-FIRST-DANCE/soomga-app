import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { api } from "./PlanApi";

export const tokenLogin = async (token: string) => {
  try {
    const response = await api.get("mypage", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    await AsyncStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

interface LoginForm {
  email: string;
  password: string;
}
export const login = async (loginForm: LoginForm) => {
  try {
    const response = await api.post("auth/signin", loginForm);
    const { accessToken } = response.data;
    SecureStore.setItem("accessToken", accessToken);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyInfo = async () => {
  try {
    const response = await api.get("mypage");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.post("auth/signout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
