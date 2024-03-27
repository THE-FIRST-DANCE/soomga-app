import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";

/* components */
import { calculateAgeRange } from "@components/guide/GuideListInfo";
import CheckboxComponent from "@components/guide/CheckboxComponent";
import SliderComponent from "@components/guide/SliderComponent";
import SelectComponent, {
  SelectContainer,
} from "@components/guide/SelectComponent";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

interface GuideFilterProps {
  isFilterVisible: boolean;
  setIsFilterVisible: (value: boolean) => void;
  guidesInSelectedRegions: GuideType[];
  guidesToRender: GuideType[];
  setGuidesToRender: (value: GuideType[]) => void;
}

function GuideFilter({
  isFilterVisible,
  setIsFilterVisible,
  guidesInSelectedRegions,
  guidesToRender,
  setGuidesToRender,
}: GuideFilterProps) {
  /* 나이 */
  const [ageRange, setAgeRange] = useState<number[]>([0, 70]);

  /* 온도 */
  const [tempRange, setTempRange] = useState<number[]>([0, 100]);

  /* 가이드 횟수 */
  const [guideCountRange, setGuideCountRange] = useState<number[]>([0, 100]);

  /* 언어 */
  const allLangs = ["모든 언어", "한국어", "English", "日本語"];
  const [langs, setLangs] = useState<string[]>([]);

  /* 성별 */
  const allGenders = ["모든 성별", "남자", "여자"];
  const [genders, setGenders] = useState<string[]>([]);

  /* TODO: 일본어, 영어 자격증 필터 추가 */

  /* 평점 */
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>(
    new Array(5).fill(false)
  );

  const [selectedRating, setSelectedRating] = useState<number[]>([]);

  /* 필터링된 가이드 정보 저장 */
  const [filteredGuides, setFilteredGuides] = useState<GuideType[]>([]);

  /* 필터 모달에서 필터링한 조건에 따라 가이드 리스트 조정 */
  const handleGuideListWithFilter = () => {
    const newFilteredGuides = guidesInSelectedRegions.filter((guide) => {
      /* 나이 필터 */
      const guideAgeRange = parseInt(
        calculateAgeRange(guide.birthDate).split("대")[0]
      );
      const ageFilter =
        guideAgeRange >= ageRange[0] && guideAgeRange <= ageRange[1];

      /* 온도 필터 */
      const tempFilter =
        guide.temp >= tempRange[0] && guide.temp <= tempRange[1];

      /* 가이드 횟수 필터 */
      const guideCountFilter =
        guide.guideCount >= guideCountRange[0] &&
        guide.guideCount <= guideCountRange[1];

      /* 언어 필터 */
      const langFilter =
        langs.length === 0 ||
        langs.some((item) => guide.language.includes(item));

      /* 성별 필터 */
      const genderFilter =
        genders.length === 0 ||
        genders.some((item) => guide.gender.includes(item));

      /* 평점 필터 */
      const ratingFilter =
        selectedRating.length === 0 ||
        selectedRating.some((item) => {
          const lowerBound = item;
          const upperBound = item + 1;
          return guide.rating >= lowerBound && guide.rating < upperBound;
        });

      return (
        ageFilter &&
        tempFilter &&
        guideCountFilter &&
        langFilter &&
        genderFilter &&
        ratingFilter
      );
    });

    return newFilteredGuides;
  };

  useEffect(() => {
    setFilteredGuides(handleGuideListWithFilter());
  }, [ageRange, tempRange, guideCountRange, langs, genders, selectedRating]);

  return (
    <Modal animationType="slide" transparent={true} visible={isFilterVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>필터</Text>
        <ScrollView
          contentContainerStyle={{ marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 나이 범위 선택 */}
          <SliderComponent
            caption="나이"
            minimumValue={10}
            maximumValue={70}
            step={10}
            range={ageRange}
            setRange={setAgeRange}
          />
          {/* 온도 범위 선택 */}
          <SliderComponent
            caption="온도"
            minimumValue={0}
            maximumValue={100}
            step={1}
            range={tempRange}
            setRange={setTempRange}
          />
          {/* 가이드 횟수 범위 선택 */}
          <SliderComponent
            caption="가이드 횟수"
            minimumValue={0}
            maximumValue={100}
            step={10}
            range={guideCountRange}
            setRange={setGuideCountRange}
          />
          <SelectContainer title="언어">
            <SelectComponent
              certificates={allLangs}
              onPress={(index: number) => {
                if (index === 0) {
                  setLangs([]);
                } else {
                  setLangs((prevLangs) => {
                    if (prevLangs.includes(allLangs[index])) {
                      return prevLangs.filter(
                        (item) => item !== allLangs[index]
                      );
                    } else {
                      return [...prevLangs, allLangs[index]];
                    }
                  });
                }
              }}
            />
          </SelectContainer>
          <SelectContainer title="성별">
            <SelectComponent
              certificates={["모든 성별", "남자", "여자"]}
              onPress={(index: number) => {
                if (index === 0) {
                  setGenders([]);
                } else {
                  setGenders((prevGenders) => {
                    if (prevGenders.includes(allGenders[index])) {
                      return prevGenders.filter(
                        (item) => item !== allGenders[index]
                      );
                    } else {
                      return [...prevGenders, allGenders[index]];
                    }
                  });
                }
              }}
            />
          </SelectContainer>
          <SelectContainer title="자격증">
            <SelectComponent
              caption="日本語  🇯🇵"
              certificates={[
                "모든 자격증",
                "    N1    ",
                "    N2    ",
                "    N3    ",
                "    N4    ",
                "    N5    ",
              ]}
              onPress={() => {}}
            />
            <SelectComponent
              caption="English  🇬🇧"
              certificates={[
                "모든 자격증",
                "900>",
                "800>",
                "700>",
                "600>",
                "<600",
              ]}
              onPress={() => {}}
            />
          </SelectContainer>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.caption}>평점</Text>
            <View style={styles.selectContainer}>
              {isCheckedArray.map((isChecked, index) => (
                <CheckboxComponent
                  key={index}
                  isChecked={isChecked}
                  count={isCheckedArray.length - index}
                  onPress={() => {
                    const newIsCheckedArray = [...isCheckedArray];
                    newIsCheckedArray[index] = !newIsCheckedArray[index];
                    setIsCheckedArray(newIsCheckedArray);

                    setSelectedRating((prevSelectedRating) => {
                      if (newIsCheckedArray[index]) {
                        return [...prevSelectedRating, 5 - index];
                      } else {
                        return prevSelectedRating.filter(
                          (rating) => rating !== 5 - index
                        );
                      }
                    });
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* 모달 닫는 버튼 */}
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            setIsFilterVisible(false);
            setGuidesToRender(filteredGuides);
          }}
        >
          <AntDesign name="close" size={30} color="black" />
        </Pressable>
      </View>
    </Modal>
  );
}

export default GuideFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 60,
  },
  caption: { margin: 5, fontSize: 20, fontWeight: "bold" },
  selectContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.GRAY_DARK,
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
