// Libraries
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { AntDesign } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native-paper";

// Recoil
import { CurrentPeriod } from "@/state/store/PlanRecoil";

// Components
import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import PlanConfirmItem from "@/components/plan/PlanConfirmItem";
import { PlanConfirmPeriodModal } from "@/components/plan/PlanConfirmPeriodModal";

// Hooks
import { usePlanList } from "@/hooks/plan/useConfirmPlanList";
import { usePlanConfirm } from "@/hooks/plan/usePlanConfirm";

// Interface
import { PlanConfirmListItem } from "@/interface/Plan";
import { PlanStackParamList } from "@/stacks/PlanStack";

// Modules
import Colors from "@/modules/Color";

// API
import { savePlan } from "@/api/PlanApi";

const PlanConfirmScreen = () => {
  const { planConfirm } = usePlanConfirm();
  const currentPeriod = useRecoilValue(CurrentPeriod);
  const [planList, setPlanList] = useState<PlanConfirmListItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanConfirmScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { planId } = route.params; // 여행 정보

  useEffect(() => {
    if (planConfirm.periodPlan[currentPeriod]) {
      setPlanList(planConfirm.periodPlan[currentPeriod]);
    }
  }, [planConfirm, currentPeriod]);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const { markers } = usePlanList();

  const editHandler = () => {
    navigation.navigate("PlanEditScreen", {
      data: planConfirm.periodPlan,
      info: planConfirm.info,
      transport: planConfirm.transport,
    });
  };

  const { mutate } = useMutation({
    mutationFn: savePlan,
    onSuccess: () => {
      setIsLoading(false);
      navigation.navigate("PlanCreateScreen");
    },
  });

  const onSave = () => {
    Alert.alert("일정을 저장하시겠습니까?", "", [
      {
        text: "취소",
        onPress: () => {
          return;
        },
      },
      {
        text: "저장",
        onPress: () => {
          const data = {
            memberId: 2,
            planId: planId ? Number(planId) : null,
            title: planConfirm.info.title,
            period: planConfirm.info.period,
            region: planConfirm.info.province,
            list: planConfirm.periodPlan,
            transport: planConfirm.transport,
          };

          setIsLoading(true);
          mutate(data);
        },
      },
    ]);
  };

  if (!planConfirm) {
    return <Text>로딩중</Text>;
  }

  return (
    <Screen title="일정 확인">
      <View style={styles.map}>
        <GoogleMap
          center={{
            lat: planConfirm.info.lat,
            lng: planConfirm.info.lng,
          }}
          customMarker={markers}
        />
      </View>

      <View style={styles.list}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ fontSize: 16 }}>{currentPeriod} 일차</Text>
            <AntDesign name="down" size={16} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={editHandler}>
            <Text style={{ fontSize: 16, color: Colors.BLACK }}>편집</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <PlanConfirmPeriodModal
              period={planConfirm.info.period}
              setModalVisible={setModalVisible}
            />
          </View>
        </Modal>

        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        )}

        <ScrollView>
          <View style={styles.route}>
            {planList.map((item, index) => (
              <React.Fragment key={`${item.item.id}-${index}`}>
                <PlanConfirmItem index={index} item={item} />
                <View style={{ height: 15 }} />
              </React.Fragment>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={onSave}
        >
          <Text style={{ color: "white", fontSize: 16 }}>저장</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default PlanConfirmScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 20,
  },
  route: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
