import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

function ReviewPlanPlaces() {
  return (
    <View>
      <View style={styles.item}>
        <Text style={styles.title}>내 리뷰</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>내 플랜</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>내 여행지</Text>
        <AntDesign name="right" size={20} color="black" />
      </View>
    </View>
  );
}

export default ReviewPlanPlaces;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  title: {
    fontSize: 20,
  },
});
