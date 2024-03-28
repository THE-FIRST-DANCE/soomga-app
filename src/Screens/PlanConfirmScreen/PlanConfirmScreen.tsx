import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import { CurrentPeriod, PlanConfirmList } from "@/state/store/PlanRecoil";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { AntDesign } from "@expo/vector-icons";
import PlanConfirmItem from "@/components/plan/PlanConfirmItem";
import Colors from "@/modules/Color";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { PlanConfirmPeriodModal } from "@/components/plan/PlanConfirmPeriodModal";
import { usePlanList } from "@/hooks/plan/useConfirmPlanList";
import { useMutation } from "@tanstack/react-query";
import { savePlan } from "@/api/PlanApi";
import { ActivityIndicator } from "react-native-paper";
import { usePlanConfirm } from "@/hooks/plan/usePlanConfirm";

const PlanConfirmScreen = () => {
  const planConfirmList = useRecoilValue(PlanConfirmList);
  const [currentPeriod, setCurrentPeriod] = useRecoilState(CurrentPeriod);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanConfirmScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { data } = route.params; // 여행 정보

  const { confirmList, planList } = usePlanConfirm(data ? data : null);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const { markers } = usePlanList();

  const editHandler = () => {
    navigation.navigate("PlanEditScreen", {
      data: planConfirmList.periodPlan,
      info: planConfirmList.info,
      transport: planConfirmList.transport,
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
            planId: 1,
            title: planConfirmList.info.title,
            period: planConfirmList.info.period,
            region: planConfirmList.info.province,
            list: planConfirmList.periodPlan,
            transport: planConfirmList.transport,
          };

          setIsLoading(true);
          mutate(data);
        },
      },
    ]);
  };

  if (!confirmList) {
    return <Text>로딩중</Text>;
  }

  return (
    <Screen title="일정 확인">
      <View style={styles.map}>
        <GoogleMap
          center={{
            lat: confirmList.info.lat,
            lng: confirmList.info.lng,
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
              period={confirmList.info.period}
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
