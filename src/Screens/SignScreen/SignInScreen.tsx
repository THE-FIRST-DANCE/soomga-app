import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";

/* components */
import InputText from "@/components/sign/InputText";
import NextButton from "@/components/sign/NextButton";
import GoogleIcon from "@/components/icons/GoogleIcon";
import LineIcon from "@/components/icons/LineIcon";
import Profile from "@/components/profile/Profile";

/* vector-icons */
import { Feather } from "@expo/vector-icons";

/* navigation */
import { NavigationProp, useNavigation } from "@react-navigation/native";

// interface
import { useRecoilValue } from "recoil";
import { SignStackParamList } from "@/stacks/SignStack";
import { UserRecoil } from "@/state/store/UserRecoil";
import { guides } from "@/data/guides";
import { api } from "@/api/PlanApi";

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  email: string;
  nickName: string;
  passwordConfirm: string;
  password: string;
}

/* 소셜 로그인 부분 수평선 */
function Hr() {
  return <View style={{ flex: 1, borderTopWidth: 1 }} />;
}

const SignInScreen = () => {
  /* navigation 추가 */
  const navigation = useNavigation<NavigationProp<SignStackParamList>>();

  /* 비밀번호 표시 여부 설정 */
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom);
  // console.log(recoilToken);

  // const user = useRecoilValue(UserRecoil);
  const user = {
    id: 1,
    nickname: "user1",
    email: "user1@test.com",
    avatar: guides[0].photo,
  };

  const googleLogin = async () => {
    await WebBrowser.openBrowserAsync(`${api}auth/google/mobile`);
  };

  const lineLogin = async () => {
    await WebBrowser.openBrowserAsync(`${api}auth/line/mobile`);
  };

  return user?.id ? (
    <View
      style={{
        flex: 1,
      }}
    >
      <Profile user={user} />
    </View>
  ) : (
    <View
      style={{
        padding: 20,
      }}
    >
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
        <View style={{ position: "relative" }}>
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
      </View>
      {/* 회원가입, 비밀번호 재설정 버튼 */}
      <View style={styles.signInButtonContainer}>
        <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}>
          <Text style={styles.signInText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}>
          <Text style={styles.signInText}>비밀번호를 잊어버렸나요?</Text>
        </TouchableOpacity>
      </View>
      {/* 로그인 버튼 */}
      <NextButton />
      {/* 소셜 로그인 컨테이너 */}
      <View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Hr />
          <Text style={{ marginHorizontal: 5, fontSize: 15 }}>소셜 로그인</Text>
          <Hr />
        </View>
        <View style={styles.socialLoginContainer}>
          {/* 구글 소셜 로그인 */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.socialLoginButton}
            onPress={googleLogin}
          >
            <GoogleIcon
              style={{
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
          {/* 라인 소셜 로그인 */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.socialLoginButton}
            onPress={lineLogin}
          >
            <LineIcon
              style={{
                width: 50,
                height: 50,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  /* 제목 텍스트 스타일 */
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 80,
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
  visibleButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  /* 회원가입, 비밀번호 재설정 버튼 컨테이너 스타일 */
  signInButtonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
  },
  /* 회원가입, 비밀번호 재설정 텍스트 스타일 */
  signInText: {
    color: "gray",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  /* 소셜 로그인 버튼 컨테이너 스타일 */
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  /* 소셜 로그인 버튼 스타일 */
  socialLoginButton: {
    width: 70,
    height: 70,
    marginHorizontal: 40,
    borderRadius: 100,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  /* 소셜 로그인 이미지 스타일 */
  socialLoginImage: { width: 50, height: 50 },
});
