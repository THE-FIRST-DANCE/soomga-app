import { PlaceData } from "@/interface/Plan";
import Colors from "@/modules/Color";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { categories } from "@/data/categories";

interface PlaceDetailModalProps {
  place: PlaceData;
  setModalVisible: (visible: boolean) => void;
}

const PlaceDetailModal = ({
  place,
  setModalVisible,
}: PlaceDetailModalProps) => {
  const category = categories.find((c) => c.value === place.category);

  const [open, setOpen] = useState<boolean>(false);

  const timeValue = (time: string) => {
    const hour = time.slice(0, 2);
    const minute = time.slice(2, 4);
    return `${hour} : ${minute}`;
  };

  const defaultDays = [
    { dayOfWeek: 0, dayName: "일요일", status: "정보없음" },
    { dayOfWeek: 1, dayName: "월요일", status: "정보없음" },
    { dayOfWeek: 2, dayName: "화요일", status: "정보없음" },
    { dayOfWeek: 3, dayName: "수요일", status: "정보없음" },
    { dayOfWeek: 4, dayName: "목요일", status: "정보없음" },
    { dayOfWeek: 5, dayName: "금요일", status: "정보없음" },
    { dayOfWeek: 6, dayName: "토요일", status: "정보없음" },
  ];

  place.openingHours?.forEach((time) => {
    const dayInfo = defaultDays.find((day) => day.dayOfWeek === time.dayOfWeek);
    if (dayInfo) {
      dayInfo.status = `${timeValue(time.openTime)} - ${timeValue(
        time.closeTime
      )}`;
    }
  });

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <AntDesign name="close" size={24} color={Colors.BLACK} />
        </TouchableOpacity>

        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.category}>{category?.label}</Text>
        <View style={styles.time}>
          <AntDesign name="star" size={16} color={Colors.PRIMARY} />
          <Text style={styles.rating}>{place.rating}</Text>
        </View>
        <Image
          source={{ uri: place.photo }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.address}>주소 : {place.address}</Text>
        <Text style={styles.address}>전화번호 : {place.phone}</Text>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.time}>
          <Text style={styles.address}>영업시간</Text>
          <AntDesign name="down" size={16} color={Colors.BLACK} />
        </TouchableOpacity>

        {open && (
          <View style={styles.timeContainer}>
            {defaultDays.map((day, index) => (
              <View key={index} style={styles.timeText}>
                <Text style={styles.address}>{day.dayName}</Text>
                <Text style={styles.address}>{day.status}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default PlaceDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  category: {
    fontSize: 16,
    color: Colors.GRAY_MEDIUM,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginBottom: 10,
  },
  time: {
    flexDirection: "row",
    gap: 5,
    marginBottom: 10,
  },
  timeContainer: {
    backgroundColor: Colors.GRAY_MEDIUM,
    padding: 10,
    borderRadius: 10,
  },
  timeText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
