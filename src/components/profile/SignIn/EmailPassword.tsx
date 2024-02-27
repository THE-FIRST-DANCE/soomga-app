import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

/* components */
import InputText from "@profile/InputText";

/* vector-icons */
import { Feather } from "@expo/vector-icons";
import NextButton from "../NextButton";

function EmailPassword() {
  /* 비밀번호 표시 여부 설정 */
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  /* 비밀번호 확인 표시 여부 설정 */
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] =
    useState<boolean>(false);

  /* --------------------------------------------------------------------------------- */

  /* 이메일 유효성 검사 */
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const handleEmailInputChange = (text: string) => {
    setEmailInputValue(text);
    console.log(emailInputValue);
  };

  /* 이메일 정규식 */
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const isEmailValid = (email: string): boolean => {
    return emailRegex.test(email);
  };

  /* --------------------------------------------------------------------------------- */

  /* 비밀번호 유효성 검사 */
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");

  const handlePasswordInputChange = (text: string) => {
    setPasswordInputValue(text);
    console.log(passwordInputValue);
  };

  /* 비밀번호 정규식 */
  const passwordRegex = /^\d{8,}$/;

  const isPasswordValid = (password: string): boolean => {
    return passwordRegex.test(password);
  };

  /* --------------------------------------------------------------------------------- */

  /* 비밀번호 확인 유효성 검사 */
  const [passwordCheckInputValue, setPasswordCheckInputValue] =
    useState<string>("");

  const handlePasswordCheckInputChange = (text: string) => {
    setPasswordCheckInputValue(text);
    console.log(passwordCheckInputValue);
  };

  const isPasswordCheckValid = (): boolean => {
    return passwordInputValue === passwordCheckInputValue;
  };

  /* --------------------------------------------------------------------------------- */

  return (
    <View style={{ marginHorizontal: 25 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 제목, 부제목 */}
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>
          여행의 시작, {"\n"}
          <Text style={styles.soomgaText}>SOOMGA</Text>
          <Text>와 함께라면</Text> {"\n"}
          당신만의 특별한 여행이 펼쳐집니다.
        </Text>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 70 }}>
            {/* 이메일 입력창 */}
            <InputText
              title="이메일"
              placeholder="username@gmail.com"
              onChangeText={handleEmailInputChange}
            />
            {/* 이메일 유효성 검사 */}
            {emailInputValue !== "" && !isEmailValid(emailInputValue) && (
              <Text style={{ color: "red" }}>유효한 이메일이 아닙니다.</Text>
            )}
            {/* 비밀번호 입력창 */}
            <View style={{ flexDirection: "row" }}>
              <InputText
                title="비밀번호"
                placeholder="비밀번호 입력"
                style={{ marginTop: 20 }}
                isPasswordVisible={isPasswordVisible}
                onChangeText={handlePasswordInputChange}
              />
              {/* 비밀번호 표시 여부 선택 */}
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
            {/* 비밀번호 유효성 검사 */}
            {passwordInputValue !== "" &&
              !isPasswordValid(passwordInputValue) && (
                <Text style={{ color: "red" }}>
                  비밀번호는 숫자 8자 이상이어야 합니다.
                </Text>
              )}
            {/* 비밀번호 확인 입력창 */}
            <View style={{ flexDirection: "row" }}>
              <InputText
                title="비밀번호 확인"
                placeholder="비밀번호 입력"
                style={{ marginTop: 20 }}
                isPasswordVisible={isPasswordCheckVisible}
                onChangeText={handlePasswordCheckInputChange}
              />
              {/* 비밀번호 확인 표시 여부 선택 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  setIsPasswordCheckVisible(!isPasswordCheckVisible)
                }
                style={styles.visibleButton}
              >
                {isPasswordCheckVisible ? (
                  <Feather name="eye-off" size={24} color="black" />
                ) : (
                  <Feather name="eye" size={24} color="black" />
                )}
              </TouchableOpacity>
            </View>
            {/* 비밀번호 확인 유효성 검사 */}
            {passwordInputValue !== "" && !isPasswordCheckValid() && (
              <Text style={{ color: "red" }}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <NextButton
        style={{ marginTop: 50 }}
        onPress={() => console.log("Next Page Button Pressed")}
      />
    </View>
  );
}

export default EmailPassword;

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

  /* 비밀번호 표시 여부 버튼 스타일 */
  visibleButton: { position: "absolute", right: 20, top: 60 },
});
