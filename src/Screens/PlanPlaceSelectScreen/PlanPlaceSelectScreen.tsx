import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import PlaceSelectedListItem from "@/components/plan/PlaceSelectedListItem";
import SelectTransportationModal from "@/components/plan/SelectTransportationModal";
import useCalculateTotalTime from "@/hooks/useCalcurateTotalTime";
import Colors from "@/modules/Color";
import { PlanStackParamList } from "@/stacks/PlanStack";
import {
  CurrentPeriod,
  PeriodPlanRecoil,
  PlanInfo,
} from "@/state/store/PlanRecoil";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";

const PlanPlaceSelectScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const planInfo = useRecoilValue(PlanInfo);

  const [currentPeriod, setCurrentPeriod] = useRecoilState(CurrentPeriod);
  const [periodPlan, setPlanPeriod] = useRecoilState(PeriodPlanRecoil);
  const currentPlan = periodPlan[currentPeriod] || [];

  const totalTime = useCalculateTotalTime(currentPlan);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const placeAdd = () => {
    navigation.navigate("PlaceSelectScreen", {
      editMode: false,
    });
  };

  const resetPlan = () => {
    setPlanPeriod((prev) => {
      const newPlan = { ...prev };
      newPlan[currentPeriod] = [];
      return newPlan;
    });
  };

  const markers = currentPlan.map((item) => {
    return {
      lat: item.item.latitude,
      lng: item.item.longitude,
    };
  });

  return (
    <Screen title="장소 선택">
      <View style={styles.header}>
        <Text style={styles.title}>{planInfo.title}</Text>
        <Text style={styles.region}>{planInfo.province}</Text>
      </View>

      {/* 일차 */}
      <View style={styles.period}>
        {Array.from({ length: planInfo.period }, (_, i) => (
          <TouchableOpacity
            onPress={() => setCurrentPeriod(i + 1)}
            key={i}
            style={[
              styles.periodButton,
              {
                backgroundColor:
                  currentPeriod === i + 1 ? Colors.PRIMARY : "transparent",
              },
            ]}
          >
            <Text style={styles.periodText}>{i + 1}일차</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 맵 */}
      <View style={styles.map}>
        <GoogleMap
          center={{
            lat: planInfo.lat,
            lng: planInfo.lng,
          }}
          marker={markers}
        />
      </View>

      {/* 장소 리스트 */}
      <View style={styles.list}>
        <View style={styles.listHeader}>
          <Text style={styles.listNumber}>{currentPlan.length}</Text>
          <View style={styles.listTimeAndReset}>
            <TouchableOpacity onPress={resetPlan}>
              <Text style={styles.clickText}>초기화</Text>
            </TouchableOpacity>
            <Text>{totalTime}</Text>
          </View>
          <View style={styles.addButton}>
            <Button onPress={placeAdd} title="장소 추가" color={Colors.BLUE} />
          </View>
        </View>

        {currentPlan.length > 0 ? (
          <ScrollView style={styles.selectedList}>
            {currentPlan.map((item, index) => (
              <PlaceSelectedListItem key={index} item={item} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.notPlace}>
            <Text style={{ color: Colors.GRAY_DARK }}>장소를 추가하세요</Text>
          </View>
        )}
      </View>

      {/* 확인 버튼 */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 16 }}>확인</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <SelectTransportationModal
            modalClose={() => setModalVisible(false)}
          />
        </View>
      </Modal>
    </Screen>
  );
};

export default PlanPlaceSelectScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  region: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  listNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
  listTimeAndReset: {
    flexDirection: "column",
    marginLeft: 10,
    gap: 2,
  },
  clickText: {
    fontSize: 16,
    color: Colors.BLUE,
  },
  addButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  selectedList: {
    marginTop: 10,
    flex: 1,
  },
  notPlace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  period: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  periodButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GRAY_DARK,
    padding: 10,
  },
  periodText: {
    fontSize: 16,
  },
  confirmButton: {
    width: "80%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginBottom: 20,
  },
});
