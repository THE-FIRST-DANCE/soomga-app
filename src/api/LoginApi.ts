import AsyncStorage from "@react-native-async-storage/async-storage";
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
