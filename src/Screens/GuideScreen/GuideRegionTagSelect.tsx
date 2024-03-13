import { Pressable, StyleSheet, Text, View } from "react-native";

import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { styles as TagStyle } from "@/components/main/Tags";
import { useState } from "react";

function GuideRegionTagSelect() {
  const regions = [
    { id: 1, name: "모든 지역" },
    { id: 2, name: "서울" },
    { id: 3, name: "인천" },
    { id: 4, name: "부산" },
    { id: 5, name: "대구" },
    { id: 6, name: "대전" },
    { id: 7, name: "광주" },
    { id: 8, name: "울산" },
    { id: 9, name: "경기" },
    { id: 10, name: "강원" },
    { id: 11, name: "충남" },
    { id: 12, name: "충북" },
    { id: 13, name: "경북" },
    { id: 14, name: "경남" },
    { id: 15, name: "전북" },
    { id: 16, name: "전남" },
    { id: 17, name: "제주" },
  ];

  const [isRegionSelected, setIsRegionSelected] = useState<boolean[]>(
    regions.map((region, index) => (index === 0 ? true : false))
  );

  const toggleRegionSelection = (index: number) => {
    const newSelectedRegions = [...isRegionSelected];

    if (index === 0) {
      newSelectedRegions.forEach((_, idx) => {
        newSelectedRegions[idx] = idx === 0;
      });
    } else {
      newSelectedRegions[0] = false;
      newSelectedRegions[index] = !newSelectedRegions[index];
    }
    setIsRegionSelected(newSelectedRegions);
  };

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const showSelectedRegions = () => {
    let selectedRegionsString = "";
    selectedRegions.forEach((region, index) => {
      index === 0
        ? (selectedRegionsString = selectedRegions[index])
        : (selectedRegionsString += selectedRegions[index]);
    });

    return selectedRegionsString;
  };

  return (
    <Screen title="가이드 매칭">
      <View style={styles.container}>
        <Text style={styles.title}>지역 선택</Text>
        <View
          style={{ ...styles.selectedRegionContainer, borderBottomWidth: 0 }}
        >
          <Text></Text>
        </View>
        <View style={styles.selectedRegionContainer}>
          {regions.map((region, index) => (
            <Pressable
              key={region.id}
              style={{
                ...TagStyle.tag,
                width: 63,
                alignItems: "center",
                backgroundColor: isRegionSelected[index]
                  ? Colors.BASKETBALL_ORANGE
                  : Colors.WHITE,
              }}
              onPress={() => {
                if (index === 0) {
                  setSelectedRegions([]);
                  console.log("선택된 지역: ", selectedRegions);
                } else {
                  selectedRegions.push(region.name);
                  console.log("선택된 지역: ", selectedRegions);
                }
                toggleRegionSelection(index);
              }}
            >
              <Text
                style={{
                  fontSize: index === 0 ? 13 : 15,
                  lineHeight: 18,
                  color: isRegionSelected[index] ? Colors.WHITE : Colors.BLACK,
                }}
              >
                {region.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ flex: 0.5, borderWidth: 1 }}>
        <Text>Guide Matching Page</Text>
      </View>
    </Screen>
  );
}

export default GuideRegionTagSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    width: 330,
    marginBottom: 10,
  },
  selectedRegionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 330,
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    borderRadius: 15,
    gap: 10,
    padding: 10,
  },
});
