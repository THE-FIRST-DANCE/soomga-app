import Colors from "@/modules/Color";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { PlaceData } from "@/interface/Plan";
import { categories } from "@/data/categories";
import useSubstring from "@/hooks/useSubString";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentPeriod, PeriodPlanRecoil } from "@/state/store/PlanRecoil";
import PlaceDetailModal from "./PlaceDetailModal";

interface PlaceSelectTabItemProps {
  place: PlaceData;
}

const PlaceSelectTabItem = ({ place }: PlaceSelectTabItemProps) => {
  const category = categories.find((c) => c.value === place.category);
  const name = useSubstring(place.name, 15);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const currentPeriod = useRecoilValue(CurrentPeriod);
  const [planPeriod, setPlanPeriod] = useRecoilState(PeriodPlanRecoil);

  const currentPlan = planPeriod[currentPeriod] || [];

  const checked = currentPlan.some(
    (item) => item.item.placeId === place.placeId
  );

  const handleAddList = () => {
    setPlanPeriod((prev) => {
      const currentPlan = [...(prev[currentPeriod] || [])];

      if (checked) {
        // 아이템 삭제 로직
        const newPlan = currentPlan.filter(
          (item) => item.item.placeId !== place.placeId
        );
        const newPlanOrder = newPlan.map((item, index) => {
          return {
            ...item,
            order: index + 1,
          };
        });
        return {
          ...prev,
          [currentPeriod]: newPlanOrder,
        };
      } else {
        // 아이템 추가 로직
        const newPlan = [
          ...currentPlan,
          {
            item: place,
            order: currentPlan.length + 1,
            stayTime: "1시간 0분",
            checked: true,
          },
        ];
        return {
          ...prev,
          [currentPeriod]: newPlan,
        };
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
      style={styles.container}
    >
      <Image
        style={styles.placeImage}
        source={{
          uri: place.photo,
        }}
      />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{name}</Text>
        <View style={styles.placeSubInfo}>
          <Text style={styles.placeCategory}>{category?.label}</Text>
          <AntDesign
            style={{ marginBottom: 1, marginLeft: 5 }}
            name="star"
            size={16}
            color={Colors.PRIMARY}
          />
          <Text style={styles.rating}>{place.rating}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleAddList}
        style={checked ? styles.checkButton : styles.plusButton}
      >
        {checked ? (
          <AntDesign name="check" size={16} color="white" />
        ) : (
          <AntDesign name="plus" size={16} color="black" />
        )}
      </TouchableOpacity>

      {/* 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <PlaceDetailModal place={place} setModalVisible={setModalVisible} />
      </Modal>
    </TouchableOpacity>
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
    marginRight: 1,
    color: Colors.GREEN,
  },
  rating: {
    fontSize: 14,
    marginLeft: 2,
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
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
});
