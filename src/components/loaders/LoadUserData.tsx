import { UserRecoil } from "@/state/store/UserRecoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const LoadUserData = () => {
  const setUser = useSetRecoilState(UserRecoil);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData !== null) {
          // 유저 데이터가 있다면 Recoil 상태에 저장
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, [setUser]);

  return null;
};
