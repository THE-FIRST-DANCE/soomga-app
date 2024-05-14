import { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "@/modules/Color";
import { styles as TagStyle } from "@main/Tags";
import { GuideType } from "@/data/guides";
import { getAreasList, getGuidesList } from "@/api/GuideApi";
import { Area } from "@/interface/Area";

function RegionSelect({
  setGuidesInSelectedRegions,
}: {
  setGuidesInSelectedRegions: (value: GuideType[]) => void;
}) {
  /* 전체 가이드 리스트 */
  const [guides, setGuides] = useState<GuideType[]>([]);

  /* 전체 지역 리스트 */
  const [areas, setAreas] = useState<Area[]>([]);

  /* 지역 선택 여부 */
  const [isRegionSelected, setIsRegionSelected] = useState<boolean[]>(
    areas.map((_, index) => (index === 0 ? true : false))
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
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  /* 선택된 지역들 문자열로 표시 */
  const [selectedRegionString, setSelectedRegionString] =
    useState<string>("모든 지역");

  /* 지역 선택 시 마다 문자열 업데이트 */
  const updateSelectedRegionString = () => {
    const selectedRegionNames = areas
      .filter((_, index) => isRegionSelected[index])
      .map((area) => area.name);

    selectedRegionNames.length === 0
      ? setSelectedRegionString("모든 지역")
      : setSelectedRegionString(selectedRegionNames.join(", "));
  };

  useEffect(() => {
    toggleRegionSelection(0);
    updateSelectedRegionString();
    const getGuidesData = async () => {
      try {
        const guides = await getGuidesList();
        setGuides(guides);
      } catch (error) {
        console.error(error);
      }
    };

    const getAreasData = async () => {
      try {
        const areas = await getAreasList();
        const newAreas = [{ id: 0, name: "모든 지역" }, ...areas];
        setAreas(newAreas);
      } catch (error) {
        console.error(error);
      }
    };

    getGuidesData();
    getAreasData();
  }, []);

  useEffect(() => {
    updateSelectedRegionString();
    const guidesInSelectedRegions =
      selectedRegions.length === 0
        ? guides
        : guides.filter((guide) => {
            return guide.areas.some((area) =>
              selectedRegions.includes(area.area.name)
            );
          });

    setGuidesInSelectedRegions(guidesInSelectedRegions);

    console.log("선택된 지역: ", selectedRegions);
    console.log("선택된 지역 가이드들: ", guidesInSelectedRegions);
    guides.map((guide) => {
      console.log(
        "결과: ",
        guide.areas.some((area) => selectedRegions.includes(area.area.name))
      );
    });
  }, [selectedRegions, guides]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>지역 선택</Text>
      <View style={styles.selectedRegionContainer}>
        <Text>{selectedRegionString}</Text>
      </View>
      <View style={styles.selectedRegionContainer}>
        {areas.map((region, index) => (
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
            }}
          >
            <Text
              style={{
                fontSize: index === 0 ? 12 : 15,
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
