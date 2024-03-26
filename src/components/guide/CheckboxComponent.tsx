import React from "react";
import { View } from "react-native";
import Colors from "@/modules/Color";
import { MaterialIcons, Fontisto } from "@expo/vector-icons";

/* 체크박스로 선택하는 항목(평점) */
interface CheckboxProps {
  isChecked: boolean;
  count: number;
  onPress: () => void;
}

function CheckboxComponent({ isChecked, count, onPress }: CheckboxProps) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      {isChecked ? (
        <MaterialIcons
          name="check-box"
          size={24}
          color={Colors.BASKETBALL_ORANGE}
          onPress={onPress}
        />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={24}
          color={Colors.BLACK}
          onPress={onPress}
        />
      )}

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        {[...Array(count)].map((_, index) => (
          <Fontisto
            key={index}
            name="star"
            size={24}
            color={Colors.STAR_YELLOW}
            onPress={onPress}
            style={{ marginHorizontal: 3 }}
          />
        ))}
      </View>
    </View>
  );
}

export default CheckboxComponent;
