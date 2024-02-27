import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputText from "@profile/InputText";

/* vector-icons */
import { Feather } from "@expo/vector-icons";
import NextButton from "../NextButton";

function SignIn() {
  /* 비밀번호 표시 여부 설정 */
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={{ marginHorizontal: 25 }}>
      {/* 제목, 부제목 */}
      <View>
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>
          여행의 시작, {"\n"}
          <Text style={styles.soomgaText}>SOOMGA</Text>
          <Text>와 함께라면</Text> {"\n"}
          당신만의 특별한 여행이 펼쳐집니다.
        </Text>
        {/* 이메일, 비밀번호 입력창 */}
        <View style={styles.inputContainer}>
          <InputText title="이메일" placeholder="username@gmail.com" />
          <View style={{ flexDirection: "row" }}>
            <InputText
              title="비밀번호"
              placeholder="비밀번호 입력"
              style={{ marginTop: 20 }}
              isPasswordVisible={isPasswordVisible}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.visibleButton}
            >
              {isPasswordVisible ? (
                <Feather name="eye-off" size={24} color="black" />
              ) : (
                <Feather name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <InputText
              title="비밀번호 확인"
              placeholder="비밀번호 입력"
              style={{ marginTop: 20 }}
              isPasswordVisible={isPasswordVisible}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.visibleButton}
            >
              {isPasswordVisible ? (
                <Feather name="eye-off" size={24} color="black" />
              ) : (
                <Feather name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <NextButton style={{ marginTop: 100 }} />
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  /* 제목 텍스트 스타일 */
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 100,
  },
  /* 부제목 스타일 */
  subtitle: {
    fontSize: 15,
    marginTop: 20,
  },
  /* soomga 텍스트 스타일 */
  soomgaText: {
    color: "#DC2626",
  },
  /* 이메일/비밀번호 입력 컨테이너 스타일 */
  inputContainer: {
    marginTop: 50,
  },
  /* 비밀번호 표시 여부 버튼 스타일 */
  visibleButton: { position: "absolute", right: 20, top: 60 },
});
