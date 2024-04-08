import { UserRecoil } from "@/state/store/UserRecoil";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import * as SecureStore from "expo-secure-store";
import { tokenLogin } from "@/api/LoginApi";
import { Linking } from "react-native";

export const UserLoader = () => {
  const setUser = useSetRecoilState(UserRecoil);

  useEffect(() => {
    async function handleURLChange({ url }: { url: string }) {
      const urlParams = new URLSearchParams(url?.split("?")[1]);

      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");

      if (accessToken && refreshToken) {
        SecureStore.setItemAsync("accessToken", accessToken);
        SecureStore.setItemAsync("refreshToken", refreshToken);

        const userData = await tokenLogin(accessToken);
        if (userData) {
          setUser(userData);
        }
      }
    }

    Linking.getInitialURL().then((url) => {
      if (url) handleURLChange({ url });
    });
    const subscription = Linking.addEventListener("url", handleURLChange);

    return () => {
      subscription.remove();
    };
  }, [setUser]);

  return null;
};
