import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

/* props */
type NextButtonType = {
  style?: object;
  onPress?: () => void;
};

function NextButton({ style, onPress }: NextButtonType) {
  return (
    <TouchableOpacity
      style={[styles.loginButton, style]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <AntDesign name="arrowright" size={30} color="white" />
    </TouchableOpacity>
  );
}

export default NextButton;

const styles = StyleSheet.create({
  /* 로그인 버튼 스타일 */
  loginButton: {
    width: 60,
    height: 60,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#DC2626",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
