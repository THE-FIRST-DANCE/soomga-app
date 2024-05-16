import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SignStackParamList } from "@/stacks/SignStack";

const reviews = [
  {
    id: 1,
    communication_score: 5,
    kindness_score: 4,
    location_score: 4,
    content:
      "일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요!",
    created_at: new Date("2024-04-02"),
    updated_at: new Date(),
    writer_name: "うきょう",
  },
];

function ReviewPlanPlaces() {
  const navigation = useNavigation<NavigationProp<SignStackParamList>>();

  return (
    <View>
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.6}
        onPress={() => navigation.navigate("MyReviewsScreen")}
      >
        <Text style={styles.title}>내 리뷰</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} activeOpacity={0.6}>
        <Text style={styles.title}>내 플랜</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} activeOpacity={0.6}>
        <Text style={styles.title}>내 여행지</Text>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
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
