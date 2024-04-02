import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/modules/Color";

function ToolButton() {
  return (
    <View style={styles.container}>
      <Feather name="menu" size={40} color="black" />
    </View>
  );
}

export default ToolButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderRadius: 100,
    elevation: 10,
  },
});
