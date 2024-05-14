import Colors from "@/modules/Color";
import { User, UserRecoil } from "@/state/store/UserRecoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import * as SecureStorage from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import ReviewPlanPlaces from "./ReviewPlanPlaces";
import ProfileSetting from "./ProfileSetting";

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
  };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="logout"
        size={30}
        color="black"
        style={styles.logoutButton}
        onPress={signOut}
      />
      <View style={styles.infoContainer}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <View style={styles.info}>
          <Text style={styles.name}>{user.nickname}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={styles.counts}>
          <View style={styles.countContainer}>
            <Text style={styles.values}>0</Text>
            <Text>리뷰</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.countContainer}>
            <Text style={styles.values}>0</Text>
            <Text>팔로워</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.countContainer}>
            <Text style={styles.values}>0</Text>
            <Text>팔로잉</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.settingContainer}>
        <ReviewPlanPlaces />
        <Text style={{ color: Colors.GRAY_DARK, marginVertical: 10 }}>
          개인 정보 설정
        </Text>
        <ProfileSetting />
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: { position: "absolute", right: 20, top: 50, height: 100 },
  infoContainer: {
    position: "relative",
    marginTop: 120,
    height: 220,
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
  counts: {
    flexDirection: "row",
    marginTop: 20,
  },
  verticalLine: {
    borderLeftWidth: 2,
    height: "100%",
    borderColor: Colors.GRAY_DARK,
  },
  countContainer: {
    alignItems: "center",
    flex: 1,
  },
  values: {
    fontSize: 25,
    fontWeight: "bold",
  },
  settingContainer: {
    padding: 20,
  },
});
