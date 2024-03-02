import Colors from "@/modules/Color";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PlaceData } from "@/interface/Plan";

interface PlaceSelectTabItemProps {
  place: PlaceData;
}

const PlaceSelectTabItem = ({ place }: PlaceSelectTabItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.placeImage}
        source={{
          uri: place.photo,
        }}
      />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{place.name}</Text>
        <View style={styles.placeSubInfo}>
          <Text style={styles.placeCategory}>{place.category}</Text>
          <Text style={styles.rating}>{place.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.plusButton}>
        <AntDesign name="plus" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PlaceSelectTabItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  placeInfo: {
    flex: 1,
    gap: 5,
    marginLeft: 5,
    flexDirection: "column",
    padding: 5,
  },
  placeSubInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeName: {
    fontSize: 16,
  },
  placeCategory: {
    fontSize: 14,
    marginRight: 5,
    color: Colors.GREEN,
  },
  rating: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.GRAY_MEDIUM,
    justifyContent: "center",
    alignItems: "center",
  },
  checkButton: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
});
