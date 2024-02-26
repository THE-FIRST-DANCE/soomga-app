import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

/* components */
import InputText from "@profile/InputText";

/* vector-icons */
import { AntDesign, Feather } from "@expo/vector-icons";

/* navigation */
import { useNavigation } from "@react-navigation/native";
import {
  MyNavigationProp,
  RootStackParamList,
} from "@navigation/NavigationProps";
import { useState } from "react";

/* 소셜 로그인 부분 수평선 */
function Hr() {
  return <View style={{ width: 120, borderTopWidth: 1 }} />;
}

function LogIn() {
  /* navigation 추가 */
  const navigation =
    useNavigation<MyNavigationProp<keyof RootStackParamList>>();

  /* 비밀번호 표시 여부 설정 */
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={{ marginHorizontal: 25 }}>
      {/* 제목, 부제목 */}
      <View>
        <Text style={styles.title}>어서오세요!</Text>
        <Text style={styles.subtitle}>
          여행의 시작, {"\n"}
          <Text style={styles.soomgaText}>SOOMGA</Text>
          <Text>와 함께라면</Text> {"\n"}
          당신만의 특별한 여행이 펼쳐집니다.
        </Text>
      </View>
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
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye-off" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* 회원가입, 비밀번호 재설정 버튼 */}
      <View style={styles.signInButtonContainer}>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate("회원가입");
          }}
        >
          <Text style={styles.signInText}>회원등록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}>
          <Text style={styles.signInText}>비밀번호를 잊어버렸나요?</Text>
        </TouchableOpacity>
      </View>
      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} activeOpacity={0.6}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
      {/* 소셜 로그인 컨테이너 */}
      <View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Hr />
          <Text style={{ marginHorizontal: 5, fontSize: 15 }}>소셜 로그인</Text>
          <Hr />
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.socialLoginButton}
          >
            <Image
              source={require("@assets/googleLogo.png")}
              style={styles.socialLoginImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.socialLoginButton}
          >
            <Image
              source={require("@assets/lineLogo.png")}
              style={styles.socialLoginImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LogIn;

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
  /* 회원가입, 비밀번호 재설정 버튼 컨테이너 스타일 */
  signInButtonContainer: {
    width: 320,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  /* 회원가입, 비밀번호 재설정 텍스트 스타일 */
  signInText: {
    color: "gray",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  /* 로그인 버튼 스타일 */
  loginButton: {
    width: 50,
    height: 50,
    marginTop: 15,
    marginRight: 10,
    borderRadius: 100,
    backgroundColor: "#DC2626",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  /* 소셜 로그인 버튼 컨테이너 스타일 */
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  /* 소셜 로그인 버튼 스타일 */
  socialLoginButton: {
    width: 80,
    height: 80,
    marginHorizontal: 40,
    borderRadius: 100,
    backgroundColor: "white",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  /* 소셜 로그인 이미지 스타일 */
  socialLoginImage: { width: 50, height: 50 },
});
