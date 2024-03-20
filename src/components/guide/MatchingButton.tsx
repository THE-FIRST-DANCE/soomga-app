import Colors from "@/modules/Color";
import { GuideStackParamList } from "@/stacks/GuideStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

type MatchingButtonType = {
  onPress: () => void;
};

function MatchingButton({ onPress }: MatchingButtonType) {
  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

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
