import { StyleSheet, Text, View } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Colors from "@/modules/Color";

const tabs = [
  {
    id: 1,
    name: "사진",
    icon: <Feather name="image" size={33} color={Colors.WHITE} />,
    backgroundColor: "#88d458",
  },
  {
    id: 2,
    name: "플랜",
    icon: <Ionicons name="airplane" size={32} color={Colors.WHITE} />,
    backgroundColor: "#6492dd",
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
  },
];

function Multimedia() {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <View
          key={index}
          style={{ width: 90, height: 90, alignItems: "center" }}
        >
          <View style={[styles.tab, { backgroundColor: tab.backgroundColor }]}>
            {tab.icon}
          </View>
          <Text style={{ fontSize: 18 }}>{tab.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default Multimedia;

const styles = StyleSheet.create({
  container: { padding: 20, flexDirection: "row" },
  tab: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
