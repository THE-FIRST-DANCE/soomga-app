import { GuideType } from "@/data/guides";
import Colors from "@/modules/Color";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Pressable,
} from "react-native";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";

/* Instagram 여는 함수 */
export async function openInstagramLink(url: string) {
  const alterUrl =
    Platform.OS === "ios"
      ? "https://apps.apple.com/kr/app/instagram/id389801252"
      : "https://play.google.com/store/apps/details?id=com.instagram.android&hl=ko-KR";

  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    await Linking.openURL(alterUrl);
  }
}

/* X 여는 함수 */
export async function openXLink(url: string) {
  const alterUrl =
    Platform.OS === "ios"
      ? "https://apps.apple.com/kr/app/x/id333903271"
      : "https://play.google.com/store/apps/details?id=com.twitter.android&hl=ko-KR";

  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    await Linking.openURL(alterUrl);
  }
}

function GuideDetailInfo({ guide }: { guide: GuideType }) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoCaption}>성별</Text>
        <Text style={styles.infoText}>{guide.gender}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoCaption}>가이드 횟수</Text>
        <Text style={styles.infoText}>{guide.guideCount}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoCaption}>지역</Text>
        <Text style={styles.infoText}>{guide.region}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoCaption}>사용 언어</Text>
        <Text style={styles.infoText}>{guide.language.join(", ")}</Text>
      </View>
      <View>
        <Text style={styles.caption}>SNS</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Pressable
            style={[styles.snsButton, { width: 115 }]}
            onPress={() => openInstagramLink(guide.instagramLink)}
          >
            <AntDesign name="instagram" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Instagram</Text>
          </Pressable>
          <Pressable
            style={[styles.snsButton, { width: 60 }]}
            onPress={() => openXLink(guide.XLink)}
          >
            <FontAwesome6 name="x-twitter" size={24} color="black" />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>X</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={styles.caption}>인증 정보</Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="shield-checkmark"
            size={24}
            color={Colors.BASKETBALL_ORANGE}
          />
          <Ionicons
            name="shield-checkmark"
            size={24}
            color={Colors.BASKETBALL_ORANGE}
          />
          <Ionicons
            name="shield-checkmark"
            size={24}
            color={Colors.BASKETBALL_ORANGE}
          />
        </View>
      </View>
    </View>
  );
}

export default GuideDetailInfo;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 300,
    paddingHorizontal: 20,
    padding: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  infoCaption: {
    fontSize: 15,
    color: Colors.GRAY_DARK,
  },
  infoText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  caption: { fontSize: 20, fontWeight: "bold", marginTop: 20 },
  snsButton: {
    height: 40,
    padding: 5,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.BASKETBALL_ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
