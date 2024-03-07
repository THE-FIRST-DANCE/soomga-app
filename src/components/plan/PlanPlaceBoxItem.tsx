import Colors from "@/modules/Color";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PlaceData } from "@/interface/Plan";
import { categories } from "@/data/categories";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

export interface PlanPlaceBoxItemProps {
  place: PlaceData;
  listPlaceAdd: (place: PlaceData) => void;
  placeBoxRemove: (index: number) => void;
  index: number | undefined;
}

const PlanPlaceBoxItem = ({
  place,
  listPlaceAdd,
  placeBoxRemove,
  index,
}: PlanPlaceBoxItemProps) => {
  const category = categories.find((c) => c.value === place.category);

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: place.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.category}>{category?.label}</Text>
      </View>
      <TouchableOpacity
        style={styles.cancel}
        onPress={() => listPlaceAdd(place)}
      >
        <AntDesign name="plus" size={20} color={Colors.GRAY_DARK} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => placeBoxRemove(index!)}
        style={styles.cancel}
      >
        <AntDesign name="close" size={20} color={Colors.GRAY_DARK} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlanPlaceBoxItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  cancel: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
