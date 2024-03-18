import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/modules/Color";

/* vector-icons */
import { FontAwesome5, Foundation } from "@expo/vector-icons";

type GuideAddButtonProps = {
  onAddPress: () => void;
  onNotAddPress: () => void;
};

function GuideAddButton({ onAddPress, onNotAddPress }: GuideAddButtonProps) {
  return (
    <View style={styles.container}>
      {/* 추가 X 버튼 */}
      <TouchableOpacity style={styles.button} onPress={onNotAddPress}>
        <Foundation name="x" size={45} color={Colors.DANGER} />
      </TouchableOpacity>
      {/* 추가 O 버튼*/}
      <TouchableOpacity style={styles.button} onPress={onAddPress}>
        <FontAwesome5 name="check" size={40} color={Colors.GREEN} />
      </TouchableOpacity>
    </View>
  );
}

export default GuideAddButton;

const styles = StyleSheet.create({
  /* 전체 container 스타일 */
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 270,
    marginTop: 20,
  },
  /* 각 버튼 스타일 */
  button: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
    elevation: 5,
  },
});
