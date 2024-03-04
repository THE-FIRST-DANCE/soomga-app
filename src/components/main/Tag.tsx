import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

/* props */
export type TagType = {
  width?: number;
  name: string;
  onPress?: () => void;
};

function Tag({ name, onPress }: TagType) {
  return (
    <Pressable
      style={{ ...styles.tag, alignItems: "center" }}
      onPress={onPress}
    >
      <Text>{name}</Text>
    </Pressable>
  );
}

export default Tag;

const styles = StyleSheet.create({
  /* 각 태그 스타일 */
  tag: {
    borderColor: "#DC2626",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 5,
    padding: 7,
    height: 35,
    backgroundColor: "white",
    elevation: 5,
  },
});
