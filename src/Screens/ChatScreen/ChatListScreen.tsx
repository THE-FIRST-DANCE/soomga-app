import Screen from "@/components/Screen";
import { guides } from "@/data/guides";
import { ChatStackParamList } from "@/stacks/ChatStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

function ChatListScreen() {
  const navigation = useNavigation<NavigationProp<ChatStackParamList>>();

  return (
    <Screen title="채팅방 목록">
      <View style={styles.container}>
        <FlatList
          data={guides}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate("ChatRoomScreen", { guide: item })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.photo }}
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
