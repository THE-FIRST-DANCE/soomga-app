import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";

/* props */
type NextButtonType = {
  style?: object;
  onPress?: () => void;
  disabled?: boolean;
};

function NextButton({ style, onPress, disabled }: NextButtonType) {
  return (
    <TouchableOpacity
      style={[styles.loginButton, style]}
      activeOpacity={0.6}
      onPress={onPress}
      disabled={disabled}
    >
      <AntDesign name="arrowright" size={30} color="white" />
    </TouchableOpacity>
  );
}

export default NextButton;

const styles = StyleSheet.create({
  /* 로그인 버튼 스타일 */
  loginButton: {
    width: 50,
    height: 50,
    marginTop: 20,
    borderRadius: 100,
    backgroundColor: Colors.PRIMARY,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
