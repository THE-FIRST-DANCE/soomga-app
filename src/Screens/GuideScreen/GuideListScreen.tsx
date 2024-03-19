import Screen from "@/components/Screen";
import { View, Text, StyleSheet } from "react-native";

function GuideListScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>GuideListScreen</Text>
      </View>
    </Screen>
  );
}

export default GuideListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
});
