import Screen from "@/components/Screen";
import { PlanConfirmPeriodModal } from "@/components/plan/PlanConfirmPeriodModal";
import { PlanConfirmListItem } from "@/interface/Plan";
import Colors from "@/modules/Color";
import { PlanStackParamList } from "@/stacks/PlanStack";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import PlanEditItem from "@/components/plan/PlanEditItem";
import { usePlanEdit } from "@/hooks/plan/usePlanEdit";
import PlanEditHeader from "@/components/plan/PlanEditHeader";
import { ActivityIndicator } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlanEditScreen = () => {
  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanEditScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { data, info, transport } = route.params; // 여행 정보

  const {
    currentPeriod,
    planPlaceBox,
    setPlanPlaceBox,
    modalVisible,
    setModalVisible,
    planList,
    updatePlanList,
    onNext,
    listPlaceAdd,
    placeBoxRemove,
    setPlanList,
    itemRemove,
    isLoading,
  } = usePlanEdit({ data, info, transport });

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  // 현재 일차의 여행 리스트 업데이트
  useEffect(() => {
    setPlanList(data[currentPeriod] || []);
  }, [data, currentPeriod]);

  const planListRenderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<PlanConfirmListItem>) => {
    return (
      <PlanEditItem
        index={getIndex()}
        item={item}
        drag={drag}
        isActive={isActive}
        onRemove={itemRemove}
      />
    );
  };

  return (
    <Screen title="일정 수정">
      <GestureHandlerRootView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>일정 편집</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={styles.headerText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onNext}>
                <Text style={styles.headerText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.listContainer}>
            <DraggableFlatList
              ListHeaderComponent={() => (
                <PlanEditHeader
                  planPlaceBox={planPlaceBox}
                  setPlanPlaceBox={setPlanPlaceBox}
                  placeBoxRemove={placeBoxRemove}
                  listPlaceAdd={listPlaceAdd}
                  currentPeriod={currentPeriod}
                  setModalVisible={setModalVisible}
                />
              )}
              keyExtractor={(item, index) => `${item.item.id}-item-${index}`}
              data={planList}
              renderItem={planListRenderItem}
              ItemSeparatorComponent={() => {
                return <View style={styles.line}></View>;
              }}
              onDragEnd={({ data }) => {
                updatePlanList(data);
              }}
              scrollEnabled={true}
            ></DraggableFlatList>
          </View>
        </View>
      </GestureHandlerRootView>

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
            period={info.period}
            setModalVisible={setModalVisible}
          />
        </View>
      </Modal>
    </Screen>
  );
};

export default PlanEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  placeBox: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    marginVertical: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
  },
  listContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: Colors.BLACK,
    marginVertical: 10,
    alignSelf: "center",
  },
});
