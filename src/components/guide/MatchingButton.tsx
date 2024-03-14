import Colors from "@/modules/Color";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function MatchingButton() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <Text style={styles.text}>가이드 찾기 →</Text>
    </TouchableOpacity>
  );
}

export default MatchingButton;

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 40,
    borderRadius: 40,
    backgroundColor: Colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // bottom: 25,
    // right: 25,
    elevation: 5,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 20,
  },
});
