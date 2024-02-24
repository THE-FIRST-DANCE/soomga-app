import { View, Text, StyleSheet, ImageBackground } from "react-native";

type RegionType = {
  photo: string;
  name: string;
};

function Region({ photo, name }: RegionType) {
  return (
    <ImageBackground source={{ uri: photo }} style={styles.container}>
      <View style={styles.whiteBackground}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </ImageBackground>
  );
}

export default Region;

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 210,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 7,
  },
  whiteBackground: {
    height: 210,
    backgroundColor: "white",
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "600",
  },
});
