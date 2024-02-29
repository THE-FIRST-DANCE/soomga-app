import Screen from "@/components/Screen";
import PlanItem from "@/components/plan/PlanItem";
import Colors from "@/modules/Color";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Line, Path, Polygon, Polyline, Svg } from "react-native-svg";

const styles = StyleSheet.create({
  create: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  planList: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
  },
  createText: {
    color: Colors.WHITE,
    fontSize: 20,
  },
});

const PlanCreateScreen = () => {
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const onPressCreate = () => {
    navigation.navigate("PlanCreateDetail");
  };

  return (
    <Screen title="플랜 생성">
      {/* 플랜 생성 */}
      <View style={styles.create}>
        <TravelSvg width={72} height={72} />
        <Text style={styles.title}>새로운 플래너</Text>
        <TouchableOpacity onPress={onPressCreate} style={styles.createButton}>
          <Text style={styles.createText}>만들기</Text>
        </TouchableOpacity>
      </View>

      {/* 플랜 리스트 */}
      <ScrollView contentContainerStyle={styles.planList}>
        <PlanItem title="제주도 여행" region="제주도" date="총 2일" />
        <PlanItem title="제주도 여행" region="제주도" date="총 1일" />
      </ScrollView>
    </Screen>
  );
};

export default PlanCreateScreen;

export const TravelSvg = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 64 64">
      <Polyline
        fill="#E5E5E5"
        points="56,22 56,54.5 40,59.5 24,54.5 8,59.5 8,26.5 24,21.8 "
      />
      <Polygon fill="#B7B7B7" points="24,21.8 24,54.5 40,59.5 40,21.9 " />
      <Path
        d="M40,40.1c0,0,13.6-9.2,13.6-22.5C53.6,10.1,47.5,4,40,4s-13.6,6.1-13.6,13.6c0,10,6.9,16.7,10.9,20.2  L40,40.1z"
        fill="#FFD766"
      />
      <Path
        d="M44.7,11.3c-0.6,0.4-1.6,1.1-2.7,2L33.4,12l-0.6,1.5l6.2,2.2c-1.8,1.5-4,3.3-4,3.3l-1.9-1.4l-0.9,0.8  l2.7,2.7c0,0,10.4-7,12.1-8.3C48.7,11.7,46.6,10.1,44.7,11.3z"
        fill="#4B687F"
      />
      <Path
        d="  M44.7,11.3c-0.6,0.4-1.6,1.1-2.7,2L33.4,12l-0.6,1.5l6.2,2.2c-1.8,1.5-4,3.3-4,3.3l-1.9-1.4l-0.9,0.8l2.7,2.7c0,0,10.4-7,12.1-8.3  C48.7,11.7,46.6,10.1,44.7,11.3z"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <Line
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="33"
        x2="43"
        y1="24"
        y2="24"
      />
      <Line
        fill="none"
        stroke="#2C3E50"
        strokeDasharray="0,3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="24"
        x2="24"
        y1="26"
        y2="51"
      />
      <Line
        fill="none"
        stroke="#2C3E50"
        strokeDasharray="0,3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="40"
        x2="40"
        y1="56"
        y2="42"
      />
      <Polyline
        fill="none"
        points="  56,22 56,54.5 40,59.5 24,54.5 8,59.5 8,26.5 24,21.8 "
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <Path
        d="  M24,22"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <Path
        d="  M40,40.1c0,0,13.6-9.2,13.6-22.5C53.6,10.1,47.5,4,40,4s-13.6,6.1-13.6,13.6c0,10,6.9,16.7,10.9,20.2L40,40.1z"
        fill="none"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
    </Svg>
  );
};
