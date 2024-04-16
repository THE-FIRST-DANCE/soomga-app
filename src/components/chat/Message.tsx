import Colors from "@/modules/Color";
import { View, Text, StyleSheet, ViewStyle, Image } from "react-native";
import { GuideType } from "@/data/guides";
import { MessageProp } from "@/Screens/ChatScreen/ChatRoomScreen";

const formatDate = (date: Date) => {
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hour}:${minute}`;
};

interface OpponentMessageProps {
  guide: GuideType;
  message: MessageProp;
  style?: ViewStyle;
  isSameSender: boolean;
}

export function OpponentMessage({
  guide,
  message,
  isSameSender,
}: OpponentMessageProps) {
  return (
    <View
      style={[
        styles.opponentMessageContainer,
        {
          marginTop: isSameSender ? 5 : 10,
          marginBottom: 5,
        },
      ]}
    >
      {isSameSender ? (
        <Image style={styles.opponentImage} />
      ) : (
        <Image source={{ uri: guide.photo }} style={styles.opponentImage} />
      )}
      <View style={{ marginLeft: 10 }}>
        {isSameSender ? null : <Text>{guide.name}</Text>}
        <View style={{ flexDirection: "row", maxWidth: "100%" }}>
          <View style={styles.opponent}>
            <Text style={{ flexWrap: "wrap" }}>{message.content}</Text>
          </View>
          <Text style={{ fontSize: 10, marginLeft: 5, alignSelf: "flex-end" }}>
            {formatDate(message.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
}

interface MyMessageProps {
  message: MessageProp;
  style?: ViewStyle;
  isSameSender: boolean;
}

export function MyMessage({ message, isSameSender }: MyMessageProps) {
  return (
    <View
      style={[
        styles.myMessageContainer,
        {
          marginTop: isSameSender ? 5 : 10,
          marginBottom: 5,
        },
      ]}
    >
      <View style={{ flexDirection: "row", maxWidth: "100%" }}>
        <Text style={{ fontSize: 10, marginLeft: 5, alignSelf: "flex-end" }}>
          {formatDate(message.created_at)}
        </Text>
        <View style={styles.my}>
          <Text style={{ flexWrap: "wrap", color: Colors.WHITE }}>
            {message.content}
          </Text>
        </View>
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
    maxWidth: "60%",
  },
  opponent: {
    ...messageStyle,
    alignSelf: "flex-start",
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  myMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  my: {
    ...messageStyle,
    alignSelf: "flex-end",
    marginLeft: 5,
    marginRight: 10,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    maxWidth: "60%",
  },
});
