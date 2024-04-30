import Colors from "@/modules/Color";
import { User, UserRecoil } from "@/state/store/UserRecoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import * as SecureStorage from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import { logout } from "@/api/LoginApi";

const Profile = ({ user }: { user: User }) => {
  const setUser = useSetRecoilState(UserRecoil);

  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    await SecureStorage.deleteItemAsync("accessToken");

    setUser({
      id: null,
      email: "",
      nickname: "",
      avatar: "",
    });
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.nickname}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={{ color: Colors.WHITE }}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    position: "relative",
    marginTop: 120,
    height: 250,
    padding: 20,
    backgroundColor: Colors.PRIMARY,
  },
  avatar: {
    width: 80,
    height: 80,
    position: "absolute",
    top: -50,
    left: "50%",
    marginLeft: -20,
    borderRadius: 50,
  },
  info: {
    marginTop: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
  },
  email: {
    fontSize: 15,
    marginTop: 10,
  },
  settingContainer: {
    marginTop: 20,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
});
