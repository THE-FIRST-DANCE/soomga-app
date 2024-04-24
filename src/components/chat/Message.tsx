import Colors from "@/modules/Color";
import { View, Text, StyleSheet, ViewStyle, Image } from "react-native";
import { GuideType } from "@/data/guides";
import { MessageProp } from "@/Screens/ChatScreen/ChatRoomScreen";
import { ServiceProps } from "./ChatReservationModal";

const formatMsgTime = (date: Date) => {
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${hour}:${minute}`;
};

const formatServiceTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${year}. ${month}. ${day} ${hour}:${minute}`;
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
        styles.opponentMsgContainer,
        {
          marginTop: isSameSender ? 5 : 10,
        },
      ]}
    >
      {isSameSender ? (
        <Image style={styles.opponentImage} />
      ) : (
        <Image source={{ uri: guide.photo }} style={styles.opponentImage} />
      )}
      <View style={{ marginLeft: 10 }}>
        {isSameSender ? null : (
          <Text style={{ marginBottom: 5 }}>{guide.name}</Text>
        )}
        <View style={{ flexDirection: "row", maxWidth: "100%" }}>
          <View style={styles.opponent}>
            <Text style={{ flexWrap: "wrap" }}>{message.content}</Text>
          </View>
          <Text style={{ fontSize: 10, marginLeft: 5, alignSelf: "flex-end" }}>
            {formatMsgTime(message.created_at)}
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
        styles.myMsgContainer,
        {
          marginTop: isSameSender ? 5 : 10,
        },
      ]}
    >
      <View style={{ flexDirection: "row", maxWidth: "100%" }}>
        <Text style={{ fontSize: 10, marginLeft: 5, alignSelf: "flex-end" }}>
          {formatMsgTime(message.created_at)}
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

export function ServiceMessage({
  service = {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2016/11/14/03/43/kimono-1822520_1280.jpg",
    title: "서비스 1",
    price: 10000,
    description:
      "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K",
  },
  isSameSender,
  created_at = new Date(),
}: {
  service: ServiceProps;
  isSameSender: boolean;
  created_at: Date;
}) {
  return (
    <View
      style={[
        styles.serviceMsgContainer,
        {
          marginTop: isSameSender ? 5 : 10,
        },
      ]}
    >
      <View style={{ flexDirection: "row", maxWidth: "100%" }}>
        <Text style={{ fontSize: 10, marginLeft: 5, alignSelf: "flex-end" }}>
          {formatMsgTime(created_at)}
        </Text>
        <View style={styles.service}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/11/14/03/43/kimono-1822520_1280.jpg",
            }}
            style={{ width: 150, height: 150 }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                marginRight: 5,
                color: Colors.WHITE,
              }}
            >
              {service.title}
            </Text>
            <Text style={{ color: Colors.WHITE }}>￦{service.price}</Text>
          </View>
          <Text style={{ fontSize: 13, marginTop: 5, color: Colors.WHITE }}>
            시작 | {formatServiceTime(created_at)}
          </Text>
          <Text style={{ fontSize: 13, marginTop: 5, color: Colors.WHITE }}>
            종료 | {formatServiceTime(created_at)}
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.WHITE,
                ...styles.button,
              }}
            >
              <Text style={{ color: Colors.BLACK, fontSize: 17 }}>거절</Text>
            </View>
            <View
              style={{
                backgroundColor: "#00ca7c",
                ...styles.button,
              }}
            >
              <Text style={{ color: Colors.WHITE, fontSize: 17 }}>확인</Text>
            </View>
          </View>
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
  opponentMsgContainer: {
    flexDirection: "row",
    maxWidth: "60%",
    marginBottom: 5,
  },
  opponent: {
    ...messageStyle,
    alignSelf: "flex-start",
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  myMsgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  my: {
    ...messageStyle,
    alignSelf: "flex-end",
    marginLeft: 5,
    marginRight: 10,
    backgroundColor: Colors.BASKETBALL_ORANGE,
  },
  serviceMsgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  service: {
    ...messageStyle,
    alignSelf: "flex-end",
    marginLeft: 5,
    marginRight: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.BASKETBALL_ORANGE,
  },
  button: {
    width: 70,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
