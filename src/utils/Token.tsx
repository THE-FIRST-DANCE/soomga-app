import AsyncStorage from "@react-native-async-storage/async-storage";

/* 토큰 저장 */
const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("accessToken", token);
    console.log("Token Saved Successfully!");
  } catch (e) {
    console.error("Error Saving Token: ", e);
  }
};

/* 토큰 불러오기 */
const loadToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (e) {
    console.error("Error loading token: ", e);
  }
};

/* 토큰 제거 */
const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    console.log("Token Removed Successfully");
  } catch (e) {
    console.error("Error Removing Token: ", e);
  }
};
