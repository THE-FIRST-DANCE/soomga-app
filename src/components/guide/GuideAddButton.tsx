import Colors from "@/modules/Color";
import { View, StyleSheet } from "react-native";

/* vector-icons */
import { FontAwesome5, Foundation } from "@expo/vector-icons";

function GuideAddButton() {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Foundation name="x" size={45} color={Colors.DANGER} />
      </View>
      <View style={styles.button}>
        <FontAwesome5 name="check" size={40} color={Colors.GREEN} />
      </View>
    </View>
  );
}

export default GuideAddButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginTop: 20,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
  },
});
