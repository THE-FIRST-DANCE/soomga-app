import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";

function ProfileSetting() {
  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.title}>프로필 수정</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>가이드 신청</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>언어 설정</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View style={styles.item}>
        <Text style={{ ...styles.title, color: Colors.DANGER }}>회원 탈퇴</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
    </View>
  );
}

export default ProfileSetting;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  title: {
    fontSize: 20,
  },
});
