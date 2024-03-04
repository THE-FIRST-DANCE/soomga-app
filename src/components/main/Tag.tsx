import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

/* props */
export type TagType = {
  name: string;
  onPress?: () => void;
  usePressedStyle?: boolean;
};

function Tag({ name, onPress, usePressedStyle }: TagType) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (onPress) onPress();
  };

  return (
    <Pressable
      style={[
        styles.tag,
        usePressedStyle && isPressed && styles.pressedTagStyle,
      ]}
      onPress={handlePress}
    >
      <Text style={usePressedStyle && isPressed && styles.pressedNameStyle}>
        {name}
      </Text>
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
    elevation: 5,
    alignItems: "center",
    backgroundColor: "white",
  },
  /* 태그가 눌렸을 때의 태그 스타일 */
  pressedTagStyle: {
    backgroundColor: "#DC2626",
  },
  /* 태그가 눌렸을 때 태그 이름 스타일 */
  pressedNameStyle: {
    color: "white",
  },
});
