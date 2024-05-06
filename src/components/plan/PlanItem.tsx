// Libraries
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Modules
import Colors from "@/modules/Color";

// Interface
import { Plans } from "@/interface/Plan";
import { PlanStackParamList } from "@/stacks/PlanStack";

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
    gap: 10,
  },
  date: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
  },
  button: {
    padding: 3,
  },
});

interface PlanItemProps {
  plan: Plans;
}

// 플랜 생성 페이지에서 플랜 리스트 아이템
const PlanItem = ({ plan }: PlanItemProps) => {
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const onClickPlan = () => {
    navigation.navigate("PlanDetailScreen", {
      planId: plan.id,
    });
  };

  return (
    <TouchableOpacity onPress={onClickPlan} style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{plan.title}</Text>
        <Text style={styles.region}>{plan.region}</Text>
      </View>
      <View
        style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 2 }}
      >
        <Ionicons name="time-outline" size={24} color="black" />
        <Text style={styles.date}>{plan.period}일</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlanItem;
