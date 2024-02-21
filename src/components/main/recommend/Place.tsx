import { View, Text, StyleSheet, ImageBackground } from "react-native";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

type SightType = {
  photo: string;
  name: string;
  distance: number;
  address: string;
  stars: number;
};

function Sight({ photo, name, distance, address, stars }: SightType) {
  return (
    <ImageBackground source={{ uri: photo }} style={styles.container}>
      <View style={{ height: 180, backgroundColor: "white", opacity: 0.7 }}>
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

export default Sight;

const styles = StyleSheet.create({
  container: {
    width: 270,
    height: 180,
    marginHorizontal: 2,
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  information: {
    position: "absolute",
    left: 20,
    bottom: 20,
    zIndex: 1,
  },
  name: { fontSize: 30, height: 40 },
  distance: {
    marginLeft: 5,
    height: 40,
    lineHeight: 50,
  },
  stars: {
    marginLeft: 5,
    lineHeight: 20,
  },
});
