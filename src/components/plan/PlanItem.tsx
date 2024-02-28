import Colors from "@/modules/Color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  region: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  date: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
});

interface PlanItemProps {
  title: string;
  region: string;
  date: string;
}

// 플랜 생성 페이지에서 플랜 리스트 아이템
const PlanItem = ({ title, region, date }: PlanItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.region}>{region}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.date}>{date}</Text>
      </View>
      <TouchableOpacity style={styles.button}></TouchableOpacity>
    </View>
  );
};

export default PlanItem;
