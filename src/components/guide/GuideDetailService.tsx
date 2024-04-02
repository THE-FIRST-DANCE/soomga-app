import { View, Text, StyleSheet } from "react-native";

function GuideDetailService() {
  return (
    <View style={styles.container}>
      <Text>GuideDetailService</Text>
    </View>
  );
}

export default GuideDetailService;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 200,
    borderWidth: 1,
  },
});
