import { View, Text, StyleSheet, Dimensions } from "react-native";

function Sights() {
  return (
    <View style={styles.container}>
      <Text>Sight Recommend Container</Text>
    </View>
  );
}

export default Sights;

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 50,
    marginTop: 5,
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
  },
});
