import { View, StyleSheet, Dimensions } from "react-native";

/* Pages */
import Places from "@placeMain/Places";
import Regions from "@regionMain/Regions";
import Guides from "@guideMain/Guides";

function Recommend() {
  return (
    <View style={styles.container}>
      <Places />
      <Regions />
      <Guides />
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
