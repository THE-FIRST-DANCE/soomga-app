import { View, Text, StyleSheet, Dimensions } from "react-native";

/* Pages */
import Sights from "./Sights";

/* vector-icons */
import { Ionicons } from "@expo/vector-icons";

function Recommend() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>여행지 추천</Text>
      <View style={styles.locationContainer}>
        <Ionicons name="location-sharp" size={30} color="black" />
        <Text style={styles.location}>대구광역시 북구 복현동</Text>
      </View>
      <View>
        <Sights />
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 30,
    marginTop: 10,
    marginHorizontal: 15,
  },
  title: { fontWeight: "700", fontSize: 25, marginLeft: 5 },
  locationContainer: { flexDirection: "row", height: 30, marginTop: 10 },
  location: { fontSize: 15, lineHeight: 26, marginLeft: 5 },
});

export default Recommend;
