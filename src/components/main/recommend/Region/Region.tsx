import { View, Text, StyleSheet, ImageBackground } from "react-native";

/* props */
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
  /* 컨테이너 스타일 */
  container: {
    width: 190,
    height: 210,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 7,
  },
  /* 연한 배경색 스타일 */
  whiteBackground: {
    height: 210,
    backgroundColor: "white",
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  /* 지역 이름 텍스트 스타일 */
  name: {
    fontSize: 25,
    fontWeight: "600",
  },
});
