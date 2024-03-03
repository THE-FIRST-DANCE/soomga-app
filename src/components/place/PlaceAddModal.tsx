import { addCategories } from "@/data/categories";
import { GooglePlace, PlaceData } from "@/interface/Plan";
import Colors from "@/modules/Color";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { addPlaceApi } from "@/api/PlanApi";

interface PlaceAddModalProps {
  place: GooglePlace;
  modalClose: () => void;
  region: string;
}

const PlaceAddModal = ({ place, modalClose, region }: PlaceAddModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("tourist_attraction");
  const [item, setItem] = useState(addCategories);

  // 장소 추가 query
  const { mutate } = useMutation({
    mutationFn: addPlaceApi,
    onSuccess: () => {
      modalClose();
    },
  });

  // 장소 추가
  const handleAddPlace = () => {
    const data: PlaceData = {
      name: place.name,
      placeId: place.place_id,
      rating: place.rating ? place.rating : 0.0,
      address: place.vicinity,
      photo: place.icon,
      category: value,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      region,
    };

    mutate(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={modalClose} style={styles.closeButton}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.address}>{place.vicinity}</Text>
      <View style={{ zIndex: 9999 }}>
        <DropDownPicker
          items={item}
          open={open}
          value={value}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItem}
          onChangeValue={(value: string | null) => {
            setValue(value || "");
          }}
          itemKey="value"
          style={styles.dropDown}
        />
      </View>
      <TouchableOpacity onPress={handleAddPlace} style={styles.addButton}>
        <Text style={{ color: Colors.WHITE, fontSize: 18 }}>추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceAddModal;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 10,
    gap: 10,
    backgroundColor: Colors.WHITE,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    fontSize: 16,
  },
  dropDown: {
    width: "100%",
    marginTop: 5,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
});
