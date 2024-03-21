import { getPlaceRoute } from "@/api/PlanApi";
import Colors from "@/modules/Color";
import {
  PeriodPlanRecoil,
  PlanConfirmList,
  PlanInfo,
} from "@/state/store/PlanRecoil";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";

interface SelectTransportationModalProps {
  modalClose: () => void;
}

const SelectTransportationModal = ({
  modalClose,
}: SelectTransportationModalProps) => {
  const [transportation, setTransportation] = useState<string>("transit");
  const [loading, setLoading] = useState<boolean>(false);

  const periodPlan = useRecoilValue(PeriodPlanRecoil);
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList);
  const planInfo = useRecoilValue(PlanInfo);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const { mutate } = useMutation({
    mutationFn: getPlaceRoute,
    onSuccess: (data) => {
      setPlanConfirmList({
        periodPlan: data,
        transport: transportation,
        info: planInfo,
      });
      setLoading(false);
      modalClose();
      navigation.navigate("PlanConfirmScreen", {});
    },
  });

  const submitHandler = async () => {
    if (planInfo.period == Object.keys(periodPlan).length) {
      setLoading(true);
      mutate({ planList: periodPlan, transport: transportation });
    } else {
      Alert.alert("일정을 모두 입력해주세요");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이동수단 선택</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          {transportation === "transit"
            ? "대중교통을 이용합니다"
            : "승용차를 이용합니다"}
        </Text>
      </View>

      <View style={styles.transportation}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                transportation === "transit" ? Colors.PRIMARY : "transparent",
            },
          ]}
          onPress={() => setTransportation("transit")}
        >
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="directions-transit" size={24} color="black" />
            <Text style={styles.buttonText}>대중교통</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                transportation === "driving" ? Colors.PRIMARY : "transparent",
            },
          ]}
          onPress={() => setTransportation("driving")}
        >
          <View
            style={{
              alignItems: "center",
              gap: 5,
            }}
          >
            <MaterialIcons name="directions-car" size={24} color="black" />
            <Text style={styles.buttonText}>승용차</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.closeAndSubmit}>
        <TouchableOpacity
          onPress={modalClose}
          style={styles.closeAndSubmitButton}
        >
          <Text style={styles.closeText}>닫기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={submitHandler}
          style={styles.closeAndSubmitButton}
        >
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.BLACK} />
        </View>
      )}
    </View>
  );
};

export default SelectTransportationModal;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    padding: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 16,
  },
  transportation: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  button: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeAndSubmit: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    gap: 30,
    marginTop: 20,
  },
  closeAndSubmitButton: {
    padding: 10,
    alignItems: "center",
  },
  closeText: {
    fontSize: 20,
    color: Colors.GRAY_DARK,
  },
  confirmText: {
    fontSize: 20,
    color: Colors.BLUE,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
