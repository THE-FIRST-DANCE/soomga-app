// Librairies
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

// Components
import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import PlanDetailPlanTab from "@/components/plan/PlanDetailPlanTab";
import PlanDetailCommentsTab from "@/components/plan/PlanDetailCommentTab";

// Type
import { Plans } from "@/interface/Plan";
import { PlanStackParamList } from "@/stacks/PlanStack";

// Api
import { executedPlan, getPlanById } from "@/api/PlanApi";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetRecoilState } from "recoil";
import { ExecutePlanState } from "@/state/store/PlanRecoil";
import PlanDetailReviewTab from "@/components/plan/PlanDetailReviewTab";
import React from "react";

enum Tab {
  Plan = "plan",
  Comment = "comment",
  Review = "review",
}

const PlanDetailScreen = () => {
  const [plan, setPlan] = useState<Plans>();
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.Plan);
  const setExecutePlanState = useSetRecoilState(ExecutePlanState);

  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanDetailScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();
  const { planId } = route.params; // 여행 정보

  const { data } = useQuery({
    queryKey: ["planDetail", planId],
    queryFn: () => getPlanById(Number(planId)),
  });

  useEffect(() => {
    if (data) {
      setPlan(data);
    }
  }, [data]);

  const navigateToDetail = () => {
    navigation.navigate("PlanConfirmScreen", {
      planId: planId,
    });
  };

  const { mutate: executePlan } = useMutation({
    mutationFn: executedPlan,
    onSuccess: async (data) => {
      try {
        await AsyncStorage.setItem(
          "executedPlan",
          JSON.stringify({
            planId: planId,
            executePlanId: data,
          })
        );
        setExecutePlanState({
          planId: planId,
          executePlanId: data,
        });
        navigation.navigate("PlanExecuteScreen", {
          executePlanId: data,
          planId: planId,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const navigateToExecute = () => {
    Alert.alert("플랜을 실행하시겠습니까?", "", [
      {
        text: "취소",
        onPress: () => {},
      },
      {
        text: "실행",
        onPress: () => {
          executePlan(planId);
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView>
        <View style={styles.header}>
          <LinearGradient
            style={styles.overlay}
            colors={["transparent", Colors.GRAY_DARK]}
          />
          <TouchableOpacity
            onPress={navigateToDetail}
            style={[
              styles.detailButton,
              {
                marginBottom: 50,
              },
            ]}
          >
            <Text style={{ color: Colors.BLACK }}>상세정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.detailButton,
              {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: Colors.PRIMARY,
              },
            ]}
            onPress={navigateToExecute}
          >
            <Text
              style={{
                color: Colors.WHITE,
              }}
            >
              플랜실행
            </Text>
          </TouchableOpacity>
          <View
            style={{
              padding: 20,
              gap: 10,
              zIndex: 2,
            }}
          >
            <Text style={styles.headerTitle}>{plan?.title}</Text>
            <View style={styles.flexRow}>
              <Text style={styles.headerSubTitle}>{plan?.region}</Text>
              <Text style={styles.headerPeriod}>{plan?.period}일</Text>
            </View>
            <View style={styles.headerUser}>
              <Image src={plan?.author.avatar} style={styles.headerUserImage} />
              <Text style={styles.headerUserText}>{plan?.author.nickname}</Text>
            </View>
            <View style={[styles.flexRow, { gap: 15 }]}>
              <View style={styles.flexRow}>
                <AntDesign name="hearto" size={24} color={Colors.DANGER} />
                <Text
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  0
                </Text>
              </View>
              <View style={styles.flexRow}>
                <AntDesign name="message1" size={24} color={Colors.BLUE} />
                <Text
                  style={{
                    color: Colors.WHITE,
                  }}
                >
                  0
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tabSelect}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setCurrentTab(Tab.Plan)}
          >
            <Text
              style={[
                styles.tabName,
                currentTab === Tab.Plan && { color: Colors.BLACK },
              ]}
            >
              플랜
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setCurrentTab(Tab.Comment)}
          >
            <Text
              style={[
                styles.tabName,
                currentTab === Tab.Comment && { color: Colors.BLACK },
              ]}
            >
              댓글
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setCurrentTab(Tab.Review)}
          >
            <Text
              style={[
                styles.tabName,
                currentTab === Tab.Review && { color: Colors.BLACK },
              ]}
            >
              리뷰
            </Text>
          </TouchableOpacity>
        </View>

        {currentTab === Tab.Plan && (
          <PlanDetailPlanTab item={plan?.daySchedules || []} key={planId} />
        )}

        {currentTab === Tab.Comment && (
          <PlanDetailCommentsTab
            comments={plan?.comments || []}
            planId={planId}
            key={planId}
          />
        )}

        {currentTab === Tab.Review && (
          <PlanDetailReviewTab
            reviews={plan?.executedPlan || []}
            key={planId}
          />
        )}
      </ScrollView>
    </Screen>
  );
};

export default PlanDetailScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "70%",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  headerSubTitle: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  headerPeriod: {
    fontSize: 18,
    color: Colors.WHITE,
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerUserText: {
    fontSize: 15,
    color: Colors.WHITE,
  },
  headerUserImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  tabSelect: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabName: {
    fontSize: 20,
    color: Colors.GRAY_DARK,
  },
  selectedTab: {
    color: Colors.PRIMARY,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
  },
  detailButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 10,
    zIndex: 3,
  },
});
