// HeaderComponent.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import PlanPlaceBoxItem from "@/components/plan/PlanPlaceBoxItem";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { useNavigation } from "@react-navigation/native";
import { PlaceData } from "@/interface/Plan";
import Colors from "@/modules/Color";

interface HeaderComponentProps {
  planPlaceBox: PlaceData[];
  setPlanPlaceBox: (data: PlaceData[]) => void;
  placeBoxRemove: (index: number) => void;
  listPlaceAdd: (place: PlaceData) => void;
  currentPeriod: number;
  setModalVisible: (visible: boolean) => void;
}

const PlanEditHeader = ({
  planPlaceBox,
  setPlanPlaceBox,
  placeBoxRemove,
  listPlaceAdd,
  currentPeriod,
  setModalVisible,
}: HeaderComponentProps) => {
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();
  const placeAddHandler = () => {
    navigation.navigate("PlaceSelectScreen", { editMode: true });
  };

  return (
    <>
      <View>
        <Text style={styles.placeBoxText}>여행지 추가</Text>
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginTop: 10 },
          ]}
        >
          <View style={styles.row}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {planPlaceBox.length}
            </Text>
            <Text style={{ color: Colors.GRAY_DARK }}> 개의 장소</Text>
          </View>
          <TouchableOpacity
            style={styles.placeAddButton}
            onPress={placeAddHandler}
          >
            <Text style={styles.placeAddButtonText}>추가하기</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 10 }}>
          <DraggableFlatList
            data={planPlaceBox}
            renderItem={({ item, getIndex }) => (
              <PlanPlaceBoxItem
                placeBoxRemove={placeBoxRemove}
                place={item}
                listPlaceAdd={listPlaceAdd}
                index={getIndex()}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-item-${index}`}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            onDragEnd={({ data }) => {
              setPlanPlaceBox(data);
            }}
          />
        </View>
      </View>

      <View style={{ height: 15 }}></View>

      <View style={styles.listHeader}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{ fontSize: 16 }}>{currentPeriod} 일차</Text>
          <AntDesign name="down" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PlanEditHeader;

const styles = StyleSheet.create({
  placeBoxText: {
    fontSize: 22,
    color: Colors.BLACK,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeAddButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  placeAddButtonText: {
    fontSize: 14,
    color: Colors.BLACK,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
