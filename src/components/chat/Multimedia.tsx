import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import { useState } from "react";
import ChatPlanModal from "./ChatPlanModal";
import ChatReservationModal from "./ChatReservationModal";

function Multimedia() {
  const [planVisible, setPlanVisible] = useState<boolean>(false);
  const [reservationVisible, setReservationVisible] = useState<boolean>(false);

  const tabs = [
    {
      id: 1,
      name: "사진",
      icon: <Feather name="image" size={33} color={Colors.WHITE} />,
      backgroundColor: "#88d458",
      /* FIX: 사진 기능 추가 후 구현 */
      visible: null,
      setVisible: null,
    },
    {
      id: 2,
      name: "플랜",
      icon: <Ionicons name="airplane" size={32} color={Colors.WHITE} />,
      backgroundColor: "#6492dd",
      visible: planVisible,
      setVisible: setPlanVisible,
    },
    {
      id: 3,
      name: "예약",
      icon: (
        <MaterialCommunityIcons
          name="calendar-check"
          size={33}
          color={Colors.WHITE}
        />
      ),
      backgroundColor: "#f56a71",
      visible: reservationVisible,
      setVisible: setReservationVisible,
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <View key={index} style={styles.tabContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.tab, { backgroundColor: tab.backgroundColor }]}
            onPress={() => {
              if (tab.visible !== null) {
                tab.setVisible(!tab.visible);
              }
            }}
          >
            {tab.icon}
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>{tab.name}</Text>
        </View>
      ))}
      {planVisible && (
        <ChatPlanModal visible={planVisible} setVisible={setPlanVisible} />
      )}
      {reservationVisible && (
        <ChatReservationModal
          visible={reservationVisible}
          setVisible={setReservationVisible}
        />
      )}
    </View>
  );
}

export default Multimedia;

const styles = StyleSheet.create({
  container: { padding: 20, flexDirection: "row" },
  tabContainer: { width: 90, height: 90, alignItems: "center" },
  tab: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
