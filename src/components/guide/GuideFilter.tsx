import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
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
import GlobalModal from "@components/Modal";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

/* recoil */
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  AgeRangeState,
  TempRangeState,
  GuideCountRangeState,
  LangsState,
  GendersState,
  SelectedRatingState,
  IsLangsSelectedState,
  IsGendersSelectedState,
  IsRatingSelectedState,
  JpnCertificateState,
  IsJpnCertificateSelectedState,
  EngCertificateState,
  IsEngCertificateSelectedState,
} from "@/state/store/GuideFilterRecoil";

interface GuideFilterProps {
  isFilterVisible: boolean;
  setIsFilterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  guidesInSelectedRegions: GuideType[];
  setGuidesToRender: React.Dispatch<React.SetStateAction<GuideType[]>>;
}

function GuideFilter({
  isFilterVisible,
  setIsFilterVisible,
  guidesInSelectedRegions,
  setGuidesToRender,
}: GuideFilterProps) {
  /* 나이 */
  const [ageRange, setAgeRange] = useRecoilState(AgeRangeState);

  /* 온도 */
  const [tempRange, setTempRange] = useRecoilState(TempRangeState);

  /* 가이드 횟수 */
  const [guideCountRange, setGuideCountRange] =
    useRecoilState(GuideCountRangeState);

  /* 언어 */
  const allLangs = ["모든 언어", "한국어", "English", "日本語"];
  const [langs, setLangs] = useRecoilState(LangsState);
  const [isLangsSelected, setIsLangsSelected] =
    useRecoilState(IsLangsSelectedState);

  /* 성별 */
  const allGenders = ["모든 성별", "남자", "여자"];
  const [genders, setGenders] = useRecoilState(GendersState);
  const [isGendersSelected, setIsGendersSelected] = useRecoilState(
    IsGendersSelectedState
  );

  /* 일본어 자격증 */
  const allJpnCertificates = ["모든 자격증", "N1", "N2", "N3", "N4", "N5"];
  const [jpnCertificates, setJpnCertificates] =
    useRecoilState(JpnCertificateState);
  const [isJpnCertificatesSelected, setIsJpnCertificatesSelected] =
    useRecoilState(IsJpnCertificateSelectedState);

  /* 영어 자격증 */
  const allEngCertificates = [
    "모든 자격증",
    "900>",
    "800>",
    "700>",
    "600>",
    "<600",
  ];
  const [engCertificates, setEngCertificates] =
    useRecoilState(EngCertificateState);
  const [isEngCertificatesSelected, setIsEngCertificatesSelected] =
    useRecoilState(IsEngCertificateSelectedState);

  /* 평점 */
  const [selectedRating, setSelectedRating] =
    useRecoilState(SelectedRatingState);
  const [isRatingSelected, setIsRatingSelected] = useRecoilState(
    IsRatingSelectedState
  );

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
    <GlobalModal
      visible={isFilterVisible}
      setVisible={setIsFilterVisible}
      animation="slide"
      type="full"
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>필터</Text>
          <Text
            style={[styles.caption, { color: Colors.BASKETBALL_ORANGE }]}
            onPress={() => {
              setIsFilterVisible(false);
              setGuidesToRender(filteredGuides);
            }}
          >
            확인
          </Text>
        </View>
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
            step={1}
            range={guideCountRange}
            setRange={setGuideCountRange}
          />
          <SelectContainer title="언어">
            <SelectComponent
              items={allLangs}
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
              isItemSelected={isLangsSelected}
              setIsItemSelected={setIsLangsSelected}
            />
          </SelectContainer>
          <SelectContainer title="성별">
            <SelectComponent
              items={allGenders}
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
              isItemSelected={isGendersSelected}
              setIsItemSelected={setIsGendersSelected}
              viewStyle={{ paddingHorizontal: 20 }}
            />
          </SelectContainer>
          <SelectContainer title="자격증">
            <SelectComponent
              caption="日本語  🇯🇵"
              items={allJpnCertificates}
              viewStyle={{ paddingHorizontal: 20 }}
              isItemSelected={isJpnCertificatesSelected}
              setIsItemSelected={setIsJpnCertificatesSelected}
            />
            <SelectComponent
              caption="English  🇬🇧"
              items={allEngCertificates}
              viewStyle={{ paddingHorizontal: 10 }}
              isItemSelected={isEngCertificatesSelected}
              setIsItemSelected={setIsEngCertificatesSelected}
            />
          </SelectContainer>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.caption}>평점</Text>
            <View style={styles.selectContainer}>
              {isRatingSelected.map((isChecked, index) => (
                <CheckboxComponent
                  key={index}
                  isChecked={isChecked}
                  count={isRatingSelected.length - index}
                  onPress={() => {
                    const newIsRatingSelected = [...isRatingSelected];
                    newIsRatingSelected[index] = !newIsRatingSelected[index];
                    setIsRatingSelected(newIsRatingSelected);

                    setSelectedRating((prevSelectedRating) => {
                      if (newIsRatingSelected[index]) {
                        return [...prevSelectedRating, 5 - index];
                      } else {
                        return prevSelectedRating.filter(
                          (rating) => rating !== 5 - index
                        );
                      }
                    });
                  }}
                  isItemSelected={isRatingSelected}
                  setIsItemSelected={setIsRatingSelected}
                />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* 모달 닫는 버튼 */}
        <Pressable
          style={styles.closeButton}
          onPress={() => setIsFilterVisible(false)}
        >
          <AntDesign name="close" size={30} color="black" />
        </Pressable>
      </View>
    </GlobalModal>
  );
}

export default GuideFilter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
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
    left: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
