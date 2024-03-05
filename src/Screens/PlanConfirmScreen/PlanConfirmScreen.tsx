import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import { CurrentPeriod, PlanConfirmList } from "@/state/store/PlanRecoil";
import React, { useRef, useState } from "react";
import {
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

const PlanConfirmScreen = () => {
  const planConfirmList = useRecoilValue(PlanConfirmList);
  const [currentPeriod, setCurrentPeriod] = useRecoilState(CurrentPeriod);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const planList = planConfirmList.periodPlan[currentPeriod] || [];

  const markers =
    planList &&
    planList.map((item, index) => {
      return {
        position: {
          lat: item.item.latitude,
          lng: item.item.longitude,
        },
        icon: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-3/512/map-marker-64.png",
        title: index + 1,
      };
    });

  return (
    <Screen title="일정 확인">
      <View style={styles.map}>
        <GoogleMap
          center={{
            lat: planConfirmList.info.lat,
            lng: planConfirmList.info.lng,
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

          <TouchableOpacity>
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
            <View style={styles.modal}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 5,
                }}
              >
                <AntDesign
                  name="down"
                  size={16}
                  color="black"
                  onPress={() => setModalVisible(false)}
                />
              </TouchableOpacity>
              <Text style={styles.modalHeaderText}>일정 선택</Text>
              <ScrollView>
                {Array.from(
                  { length: planConfirmList.info.period },
                  (_, i) => i + 1
                ).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.modalList}
                    onPress={() => {
                      setCurrentPeriod(item);
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.periodText,
                        currentPeriod === item && styles.selectedText,
                      ]}
                    >
                      {item} 일차
                    </Text>
                    {currentPeriod === item && (
                      <AntDesign
                        name="check"
                        size={20}
                        color={Colors.PRIMARY}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <ScrollView>
          <View style={styles.route}>
            {planList.map((item, index) => (
              <>
                <PlanConfirmItem
                  key={`${item.item.id}-${index}`}
                  index={index}
                  item={item}
                />
                <View key={index} style={{ height: 15 }} />
              </>
            ))}
          </View>
        </ScrollView>
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
  periodText: {
    fontSize: 20,
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalList: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
