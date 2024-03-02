import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import PlaceSelectedListItem from "@/components/plan/PlaceSelectedListItem";
import Colors from "@/modules/Color";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { PlanInfo } from "@/state/store/PlanRecoil";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

const PlanPlaceSelectScreen = () => {
  const planInfo = useRecoilValue(PlanInfo);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const placeAdd = () => {
    navigation.navigate("PlaceSelectScreen");
  };

  return (
    <Screen title="장소 선택">
      <View style={styles.header}>
        <Text style={styles.title}>{planInfo.title}</Text>
        <Text style={styles.region}>{planInfo.province}</Text>
      </View>

      {/* 맵 */}
      <View style={styles.map}>
        <GoogleMap
          center={{
            lat: planInfo.lat,
            lng: planInfo.lng,
          }}
        />
      </View>

      {/* 장소 리스트 */}
      <View style={styles.list}>
        <View style={styles.listHeader}>
          <Text style={styles.listNumber}>0</Text>
          <View style={styles.listTimeAndReset}>
            <Text style={styles.clickText}>초기화</Text>
            <Text>0시간 0분 / 12시간 0분</Text>
          </View>
          <View style={styles.addButton}>
            <Button onPress={placeAdd} title="장소 추가" color={Colors.BLUE} />
          </View>
        </View>

        <View style={styles.selectedList}>
          <PlaceSelectedListItem />
        </View>

        <View style={styles.notPlace}>
          <Text style={{ color: Colors.GRAY_DARK }}>장소를 추가하세요</Text>
        </View>
      </View>
    </Screen>
  );
};

export default PlanPlaceSelectScreen;

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  region: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  listNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
  listTimeAndReset: {
    flexDirection: "column",
    marginLeft: 10,
    gap: 2,
  },
  clickText: {
    fontSize: 16,
    color: Colors.BLUE,
  },
  addButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  selectedList: {
    marginTop: 10,
    flex: 1,
  },
  notPlace: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
