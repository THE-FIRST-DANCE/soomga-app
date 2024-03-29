import Colors from "@/modules/Color";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const LoadingScreen = ({ loading }: { loading: boolean }) => {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    zIndex: 100,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
