import { View, Text, StyleSheet, ImageBackground } from "react-native";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

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
        <View style={{ ...styles.information }}>
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
  container: {
    width: 270,
    height: 180,
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  whiteBackground: { height: 180, backgroundColor: "white", opacity: 0.7 },
  information: {
    position: "absolute",
    left: 15,
    bottom: 15,
    zIndex: 1,
  },
  name: { fontSize: 25, height: 30 },
  distance: {
    marginLeft: 5,
    height: 30,
    lineHeight: 40,
  },
  stars: {
    marginLeft: 5,
    lineHeight: 20,
  },
});
