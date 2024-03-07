import { PlanConfirmListItem } from "@/interface/Plan";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { categories } from "@/data/categories";
import Colors from "@/modules/Color";

interface PlanEditItemProps {
  item: PlanConfirmListItem;
  drag: () => void;
  isActive: boolean;
  onRemove: (index: number) => void;
  index: number | undefined;
}

const PlanEditItem = gestureHandlerRootHOC(
  ({ item, drag, isActive, onRemove, index }: PlanEditItemProps) => {
    const category = categories.find((c) => c.value === item.item.category);

    const removeHandler = () => {
      onRemove(index! + 1);
    };

    return (
      <TouchableOpacity style={styles.container} onLongPress={drag}>
        <View style={styles.order}>
          <Text style={{ color: Colors.GRAY_DARK, textAlign: "center" }}>
            {index! + 1}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.item.name}</Text>
          <View style={styles.subInfo}>
            <Text style={styles.category}>{category?.label}</Text>
            <Text style={styles.stayTime}>{item.stayTime}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.cancel} onPress={removeHandler}>
          <AntDesign name="close" size={20} color={Colors.GRAY_DARK} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
);

export default PlanEditItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
  },
  order: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  category: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  stayTime: {
    fontSize: 14,
    color: Colors.BLUE,
  },
  cancel: {
    padding: 5,
    borderColor: Colors.GRAY_MEDIUM,
  },
});
