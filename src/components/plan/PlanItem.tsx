import Colors from "@/modules/Color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useSetRecoilState } from "recoil";
import { PlanConfirmList, PlanInfo } from "@/state/store/PlanRecoil";
import { PlanConfirmListItem, Plans } from "@/interface/Plan";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { provinces } from "@/data/region";

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
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList);
  const setPlanInfo = useSetRecoilState(PlanInfo);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const lat = provinces.find((item) => item.label === plan.region)?.lat;
  const lng = provinces.find((item) => item.label === plan.region)?.lng;

  const onClickPlan = () => {
    const periodPlan: { [key: number]: PlanConfirmListItem[] } = {};

    plan.daySchedules.forEach((item) => {
      periodPlan[item.day] = item.schedules;
    });

    setPlanConfirmList({
      periodPlan,
      transport: plan.transport,
      info: {
        title: plan.title,
        province: plan.region,
        lat: lat || 0,
        lng: lng || 0,
        period: plan.period,
      },
    });

    setPlanInfo({
      title: plan.title,
      province: plan.region,
      lat: lat || 0,
      lng: lng || 0,
      period: plan.period,
    });

    navigation.navigate("PlanConfirmScreen");
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
