import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "@/modules/Color";
import { styles as TagStyle } from "../main/Tags";

function RegionSelect() {
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

  /* 지역 선택 여부 */
  const [isRegionSelected, setIsRegionSelected] = useState<boolean[]>(
    regions.map((_, index) => (index === 0 ? true : false))
  );

  /* 선택된 지역 스타일 변경 함수 */
  const toggleRegionSelection = (index: number) => {
    const newSelectedRegions = [...isRegionSelected];
    if (index === 0) {
      // 0번 요소를 true로 설정하고 나머지 요소는 false로 설정
      newSelectedRegions.forEach((_, idx) => {
        newSelectedRegions[idx] = idx === 0;
      });
    } else {
      // 0번 요소를 false로 설정하고 클릭한 요소를 반전시킴
      newSelectedRegions[0] = false;
      newSelectedRegions[index] = !newSelectedRegions[index];
    }

    if (
      newSelectedRegions.every(
        (_, index) => newSelectedRegions[index] === false
      )
    ) {
      newSelectedRegions[0] = true;
    }

    setIsRegionSelected(newSelectedRegions);
  };

  /* 선택된 지역들 이름 배열 */
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "모든 지역",
  ]);

  /* 선택된 지역들 문자열로 표시 */
  const [selectedRegionString, setSelectedRegionString] = useState<string>("");

  const showSelectedRegionsString = () => {
    selectedRegions.forEach((_, index) => {
      if (index === 0) {
        setSelectedRegionString(selectedRegions[index]);
      } else {
        if (selectedRegions.length === 0) {
          setSelectedRegionString("");
        } else {
          const selectedRegionNames = regions
            .filter((_, index) => isRegionSelected[index])
            .map((region) => region.name);
          setSelectedRegionString(selectedRegionNames.join(", "));
        }
      }
    });
  };

  useEffect(showSelectedRegionsString, []);
  useEffect(showSelectedRegionsString, [selectedRegions]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지역 선택</Text>
      <View style={styles.selectedRegionContainer}>
        <Text>{selectedRegionString}</Text>
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
              toggleRegionSelection(index);
              if (index === 0) {
                setSelectedRegions([]);
                setSelectedRegionString(region.name);
              } else {
                setSelectedRegions((prevRegions) => {
                  if (prevRegions.includes(region.name)) {
                    return prevRegions.filter((item) => item !== region.name);
                  } else {
                    return [...prevRegions, region.name];
                  }
                });
              }
              console.log(selectedRegions);
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
  );
}

export default RegionSelect;

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
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
