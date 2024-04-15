import Colors from "@/modules/Color";
import { View, Text, StyleSheet, ViewStyle, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GuideType } from "@/data/guides";

export function OpponentMessage({
  guide,
  text,
}: {
  guide: GuideType;
  text: string;
}) {
  return (
    <View style={styles.opponentMessageContainer}>
      <Image source={{ uri: guide.photo }} style={styles.opponentImage} />
      <View style={styles.opponentTail} />
      <View style={styles.opponent}>
        <Text style={{ flexWrap: "wrap" }}>
          첫 번째 메시지입니다. 첫 번째 메시지입니다. 첫 번째 메시지입니다. 첫
          번째 메시지입니다. 첫 번째 메시지입니다.
        </Text>
      </View>
    </View>
  );
}

export function MyMessage({ text }: { text: string }) {
  return (
    <View style={styles.myMessageContainer}>
      <View style={styles.myTail} />
      <View style={styles.my}>
        <Text style={{ color: Colors.WHITE }}>첫 번째 메시지입니다.</Text>
      </View>
      <MaterialCommunityIcons
        name="face-man"
        size={40}
        color="black"
        style={{ marginRight: 10 }}
      />
    </View>
  );
}

const messageStyle: ViewStyle = {
  paddingVertical: 10,
  paddingHorizontal: 10,
  borderRadius: 10,
};

const styles = StyleSheet.create({
  opponentImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginLeft: 10,
  },
  opponentMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    maxWidth: "60%",
  },
  opponent: {
    ...messageStyle,
    alignSelf: "flex-start",
    marginLeft: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  opponentTail: {
    width: 15,
    height: 15,
    backgroundColor: Colors.GRAY_MEDIUM,
    transform: [{ rotate: "65deg" }],
    position: "absolute",
    left: 57,
    top: 5,
  },
  myMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  my: {
    ...messageStyle,
    alignSelf: "flex-end",
    marginRight: 10,
    backgroundColor: Colors.BASKETBALL_ORANGE,
  },
  myTail: {
    width: 15,
    height: 15,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    transform: [{ rotate: "25deg" }],
    position: "absolute",
    right: 57,
    top: 5,
  },
});
