import Colors from "@/modules/Color";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
} from "react-native";
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

export function Message({
  isMine,
  content,
}: {
  isMine: boolean;
  content: string;
}) {
  return (
    <View
      style={{
        alignSelf: isMine ? "flex-end" : "flex-start",
        maxWidth: "65%",
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        marginLeft: isMine ? 0 : 20,
        marginRight: isMine ? 20 : 0,
        backgroundColor: isMine ? Colors.BASKETBALL_ORANGE : Colors.GRAY_MEDIUM,
      }}
    >
      <Text
        style={{ fontSize: 15, color: isMine ? Colors.WHITE : Colors.BLACK }}
      >
        {content}
      </Text>
    </View>
  );
}

export function ServiceMessage({
  service,
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
              uri: "https://cdn.pixabay.com/photo/2018/09/17/05/14/water-noodle-3683050_1280.jpg",
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
            {/* <Text style={{ color: Colors.WHITE }}>￦{service.price}</Text> */}
          </View>
          <Text style={{ fontSize: 13, marginTop: 5, color: Colors.WHITE }}>
            {/* 시작 | {formatServiceTime(created_at)} */}
            시작 | 2024. 06. 14. 10:00
          </Text>
          <Text style={{ fontSize: 13, marginTop: 5, color: Colors.WHITE }}>
            {/* 종료 | {formatServiceTime(created_at)} */}
            종료 | 2024. 06. 15. 17:00
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                backgroundColor: Colors.WHITE,
                ...styles.button,
              }}
            >
              <Text style={{ color: Colors.BLACK, fontSize: 17 }}>
                상세보기
              </Text>
            </TouchableOpacity>
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
    width: 150,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
