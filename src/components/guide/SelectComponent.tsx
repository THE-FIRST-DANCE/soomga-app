import { View, Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { styles as TagStyle } from "@main/Tags";
import Colors from "@/modules/Color";
import { useState } from "react";

/* 버튼으로 선택하는 항목(언어, 성별, 자격증) */
interface SelectProps {
  caption?: string;
  items: string[];
  onPress?: (index: number) => void;
  viewStyle?: ViewStyle;
  isItemSelected: boolean[];
  setIsItemSelected: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export function SelectContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.caption}>{title}</Text>
      <View>
        <View style={styles.selectContainer}>{children}</View>
      </View>
    </View>
  );
}

function SelectComponent({
  caption,
  items,
  onPress,
  viewStyle,
  isItemSelected,
  setIsItemSelected,
}: SelectProps) {
  /* 선택된 항목 스타일 변경 함수 */
  const toggleSelection = (index: number) => {
    const newIsItemSelected = [...isItemSelected];
    if (index === 0) {
      newIsItemSelected.forEach((_, idx) => {
        newIsItemSelected[idx] = idx === 0;
      });
    } else {
      newIsItemSelected[0] = false;
      newIsItemSelected[index] = !newIsItemSelected[index];
    }

    if (
      newIsItemSelected.every((_, index) => newIsItemSelected[index] === false)
    ) {
      newIsItemSelected[0] = true;
    }

    setIsItemSelected(newIsItemSelected);
  };

  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        {caption && <Text style={{ paddingHorizontal: 10 }}>{caption}</Text>}
        <View
          style={{ flexDirection: "row", marginVertical: 10, flexWrap: "wrap" }}
        >
          {items.map((item, index) => (
            <Pressable
              key={index}
              style={[
                TagStyle.tag,
                {
                  margin: 5,
                  alignItems: "center",
                  backgroundColor: isItemSelected[index]
                    ? Colors.BASKETBALL_ORANGE
                    : Colors.WHITE,
                },
                index !== 0 && viewStyle,
              ]}
              onPress={() => {
                toggleSelection(index);
                onPress && onPress(index);
              }}
            >
              <Text
                style={{
                  color: isItemSelected[index] ? Colors.WHITE : Colors.BLACK,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

export default SelectComponent;

const styles = StyleSheet.create({
  caption: { margin: 5, fontSize: 20, fontWeight: "bold" },
  selectContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.GRAY_DARK,
    justifyContent: "center",
  },
});
