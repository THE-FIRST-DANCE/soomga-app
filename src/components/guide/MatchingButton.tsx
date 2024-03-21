import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colors from "@/modules/Color";

type MatchingButtonType = {
  onPress: () => void;
};

function MatchingButton({ onPress }: MatchingButtonType) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={onPress}
    >
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
    elevation: 5,
  },
  text: {
    color: Colors.WHITE,
    fontSize: 18,
  },
});
