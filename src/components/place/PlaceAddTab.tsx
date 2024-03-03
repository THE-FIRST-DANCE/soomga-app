import Colors from "@/modules/Color";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import GoogleMap from "../plan/GoogleMap";
import { PlanInfo } from "@/state/store/PlanRecoil";
import { GooglePlace } from "@/interface/Plan";
import { useMutation } from "@tanstack/react-query";
import { getSearchPlaceGoogle } from "@/api/PlanApi";
import PlaceAddItem from "./PlaceAddItem";

const PlaceAddTab = ({ planInfo }: { planInfo: PlanInfo }) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<GooglePlace[]>([]); // 검색 결과
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: planInfo.lat,
    lng: planInfo.lng,
  });

  const markers =
    searchResult &&
    searchResult.map((item) => ({
      lat: item.geometry.location.lat,
      lng: item.geometry.location.lng,
    }));

  const handleSearch = () => {
    const location = planInfo.lat + "," + planInfo.lng;

    const response = getSearchPlaceGoogle(searchKeyword, location);

    return response;
  };

  const { mutate } = useMutation({
    mutationFn: handleSearch,
    onSuccess: (data) => {
      setSearchResult(data.results);
    },
  });

  const changeCenter = (lat: number, lng: number) => {
    setCenter({ lat, lng });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="상호명 또는 주소를 입력하세요"
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
          onSubmitEditing={() => mutate()}
        />
        <Feather name="search" size={18} color={Colors.GRAY_DARK} />
      </View>

      <View style={styles.map}>
        <GoogleMap center={center} marker={markers} />
      </View>

      <View style={styles.searchResult}>
        <Text style={{ fontSize: 16 }}>검색 결과 {searchResult.length}개</Text>
      </View>

      <View style={styles.list}>
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <PlaceAddItem
              changeCenter={changeCenter}
              region={planInfo.province}
              place={item}
            />
          )}
          keyExtractor={(item) => item.place_id}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      </View>
    </View>
  );
};

export default PlaceAddTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    padding: 15,
    shadowColor: Colors.GRAY_DARK,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.25,
  },
  searchInput: {
    borderRadius: 10,
  },
  map: {
    flex: 0.8,
    marginTop: 20,
  },
  searchResult: {
    marginTop: 10,
    alignItems: "center",
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
});
