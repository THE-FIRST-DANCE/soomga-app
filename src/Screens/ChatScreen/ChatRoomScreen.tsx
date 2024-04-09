import Screen from "@/components/Screen";
import { UserRecoil } from "@/state/store/UserRecoil";
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRecoilValue } from "recoil";

function ChatRoom() {
  return (
    <Screen title="채팅방 목록">
      <View style={styles.container}></View>
    </Screen>
  );
}

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
