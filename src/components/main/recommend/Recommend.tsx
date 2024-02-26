import { View, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  /* 추천 전체 스타일 */
  container: {
    marginTop: 20,
    marginLeft: 15,
  },
});

export default Recommend;
