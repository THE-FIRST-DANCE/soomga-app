import { View, Text, StyleSheet, Dimensions } from "react-native";

function Guides() {
  return (
    <View style={styles.container}>
      <Text>Guides Recommend Container</Text>
    </View>
  );
}

export default Guides;

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
