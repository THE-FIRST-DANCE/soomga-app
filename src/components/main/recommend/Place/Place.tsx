import { View, Text, StyleSheet, ImageBackground } from "react-native";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

/* props */
type SightType = {
  photo: string;
  name: string;
  lat: number;
  lng: number;
  distance: number;
  address: string;
  stars: number;
};

function Place({ photo, name, lat, lng, distance, address, stars }: SightType) {
  return (
    <ImageBackground source={{ uri: photo }} style={styles.container}>
      <View style={styles.whiteBackground}>
        <View style={styles.information}>
          <View style={{ flexDirection: "row", width: 180 }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
              {name}
            </Text>
            <Text style={styles.distance}>{distance}km</Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 230 }}>
            {address}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <AntDesign name="star" size={24} color="#ffd900" />
            <Text style={styles.stars}>{stars}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Place;

const styles = StyleSheet.create({
  /* 컨테이너 스타일 */
  container: {
    width: 270,
    height: 180,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 7,
  },
  /* 연한 배경색 스타일 */
  whiteBackground: { height: 180, backgroundColor: "white", opacity: 0.6 },
  information: {
    position: "absolute",
    left: 15,
    bottom: 15,
    zIndex: 1,
  },
  /* 관광지 이름 텍스트 스타일 */
  name: { fontSize: 25, height: 30 },
  /* 거리 텍스트 스타일 */
  distance: {
    marginLeft: 5,
    height: 30,
    lineHeight: 40,
  },
  /* 별점 텍스트 스타일 */
  stars: {
    marginLeft: 5,
    lineHeight: 20,
  },
});
