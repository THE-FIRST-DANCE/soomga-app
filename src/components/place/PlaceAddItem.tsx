import { GooglePlace } from "@/interface/Plan";
import Colors from "@/modules/Color";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import PlaceAddModal from "./PlaceAddModal";

interface PlaceAddItemProps {
  place: GooglePlace;
  changeCenter: (lat: number, lng: number) => void;
  region: string;
}

const PlaceAddItem = ({ place, changeCenter, region }: PlaceAddItemProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          changeCenter(place.geometry.location.lat, place.geometry.location.lng)
        }
        style={styles.container}
      >
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{place.name}</Text>
          <Text style={styles.placeAddress}>{place.vicinity}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.plusButton}
        >
          <Text style={styles.plusText}>추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <PlaceAddModal
            modalClose={() => setModalVisible(false)}
            place={place}
            region={region}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PlaceAddItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  placeInfo: {
    flex: 1,
    flexDirection: "column",
  },
  placeName: {
    fontSize: 16,
  },
  placeAddress: {
    fontSize: 14,
    color: "gray",
  },
  plusButton: {
    padding: 10,
    backgroundColor: Colors.GRAY_DARK,
    borderRadius: 10,
  },
  plusText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});
