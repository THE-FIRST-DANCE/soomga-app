import { View, StyleSheet, Dimensions } from "react-native";

/* Pages */
import Places from "@recommendMain/Places";
import Regions from "@recommendMain/Regions";

function Recommend() {
  return (
    <View style={styles.container}>
      <Places />
      <Regions />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  /* 추천 전체 스타일 */
  container: {
    width: screenWidth - 30,
    marginTop: 20,
    marginHorizontal: 15,
  },
});

export default Recommend;
