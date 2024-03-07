import Colors from "@/modules/Color";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { categories } from "@/data/categories";
import PlaceSelectTabItem from "./PlaceSelectTabItem";
import { getPlaceApi } from "@/api/PlanApi";
import { useQuery } from "@tanstack/react-query";
import { PlaceData } from "@/interface/Plan";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";

interface PlaceSelectTabProps {
  region: string;
  editMode?: boolean;
}

const PlaceSelectTab = ({ region, editMode }: PlaceSelectTabProps) => {
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [places, setPlaces] = useState<PlaceData[]>([]);

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const getPlace = () => {
    return getPlaceApi(currentCategory.value, region);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["places"],
    queryFn: getPlace,
  });

  useEffect(() => {
    if (data) {
      setPlaces(data);
    }
  }, [data]);

  const filterPlaces = () => {
    const filterPlaces =
      currentCategory.value === "all"
        ? data
        : places?.filter((place) => place.category === currentCategory.value);

    if (searchKeyword !== "") {
      const searchPlaces = filterPlaces.filter((place: PlaceData) =>
        place.name.includes(searchKeyword)
      );
      setPlaces(searchPlaces);
      return;
    }

    setPlaces(filterPlaces);
  };

  useEffect(() => {
    filterPlaces();
  }, [searchKeyword, currentCategory]);

  const handleConfirm = () => {
    if (editMode) {
      navigation.goBack();
      return;
    }
    navigation.navigate("PlanPlaceSelectScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchInput}
          placeholder="장소를 검색하세요"
          value={searchKeyword}
          onChangeText={(text) => setSearchKeyword(text)}
        />
        <Feather name="search" size={18} color={Colors.GRAY_DARK} />
      </View>

      <View style={styles.categories}>
        {categories.map((category, index) => (
          <TouchableOpacity
            onPress={() => setCurrentCategory(category)}
            key={index}
            style={[
              styles.category,
              currentCategory === category && styles.selectedCategory,
            ]}
          >
            <Text style={styles.categoryText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.placeList}>
        {places?.length > 0 ? (
          <FlatList
            data={places}
            keyExtractor={(item) => item?.id?.toString() || item.name}
            renderItem={({ item }) => (
              <PlaceSelectTabItem editMode={editMode} place={item} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          />
        ) : (
          <Text>장소가 없습니다.</Text>
        )}
      </View>

      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={{ color: Colors.WHITE }}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceSelectTab;

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
  categories: {
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
  },
  categoryText: {
    fontSize: 16,
    color: Colors.GRAY_DARK,
  },
  selectedCategory: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.BLACK,
  },
  placeList: {
    flex: 1,
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});
