import { getRooms } from "@/api/ChatApi";
import { getMyInfo } from "@/api/LoginApi";
import Screen from "@/components/Screen";
import { Member } from "@/interface/Chat";
import { ChatStackParamList } from "@/stacks/ChatStack";
import { ChatList } from "@/state/store/ChatList";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRecoilState } from "recoil";

function ChatListScreen() {
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

  const [chatLists, setChatLists] = useRecoilState(ChatList);
  const [opponent, setOpponent] = useState<Member | null>(null);

  useEffect(() => {
    const getRoomsData = async () => {
      try {
        const rooms = await getRooms();
        const { id: myId } = await getMyInfo();

        if (rooms) {
          setChatLists(rooms);

          rooms[0].members.forEach(({ member }) => {
            if (member.id !== myId) {
              setOpponent(member);
            }
          });
        } else {
          console.error("Failed to fetch Chat rooms");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getRoomsData();
  }, []);

  useEffect(() => {
    console.log("채팅 리스트:", chatLists);
  }, [chatLists]);

  useEffect(() => {
    console.log("상대방", opponent);
  }, [opponent]);

  return (
    <Screen title="채팅방 목록">
      <View style={styles.container}>
        <FlatList
          data={chatLists}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate("ChatRoomScreen", { opponent: opponent })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={
                    opponent?.avatar
                      ? { uri: opponent.avatar }
                      : require("src/assets/defaultProfile.png")
                  }
                  style={{ width: 60, height: 60, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.message}>메시지</Text>
                </View>
                <View>
                  <Text>12:00</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </Screen>
  );
}

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItem: {
    height: 100,
    padding: 10,
    justifyContent: "center",
    borderWidth: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    marginTop: 10,
  },
});
