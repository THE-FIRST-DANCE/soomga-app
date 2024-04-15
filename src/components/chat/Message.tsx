import Colors from "@/modules/Color";
import { View, Text, StyleSheet, ViewStyle, Image } from "react-native";
import { GuideType } from "@/data/guides";
import { MessageProp } from "@/Screens/ChatScreen/ChatRoomScreen";

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
      <View style={{ marginLeft: 10 }}>
        <Text>{guide.name}</Text>
        <View style={styles.opponent}>
          <Text style={{ flexWrap: "wrap" }}>반가워요~</Text>
        </View>
      </View>
    </View>
  );
}

export function MyMessage({ message }: { message: MessageProp }) {
  return (
    <View style={styles.myMessageContainer}>
      <View style={styles.my}>
        <Text style={{ color: Colors.WHITE }}>{message.content}</Text>
      </View>
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
    marginVertical: 10,
    maxWidth: "60%",
  },
  opponent: {
    ...messageStyle,
    alignSelf: "flex-start",
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
    maxWidth: "60%",
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
