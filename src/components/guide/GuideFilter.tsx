import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Colors from "@/modules/Color";
import { AntDesign } from "@expo/vector-icons";
import CheckboxComponent from "./CheckboxComponent";
import SliderComponent from "./SliderComponent";
import SelectComponent, { SelectContainer } from "./SelectComponent";

function GuideFilter({
  isFilterVisible,
  setIsFilterVisible,
}: {
  isFilterVisible: boolean;
  setIsFilterVisible: (value: boolean) => void;
}) {
  const [ageRange, setAgeRange] = useState<number[]>([20, 40]);
  const [tempRange, setTempRange] = useState<number[]>([30, 70]);
  const [guideCountRange, setGuideCountRange] = useState<number[]>([10, 80]);
  const [gender, setGender] = useState<string>("");
  const [langs, setLangs] = useState<string[]>([]);
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>(
    new Array(5).fill(false)
  );

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
              certificates={["모든 언어", "한국어", "English", "日本語"]}
            />
          </SelectContainer>
          <SelectContainer title="성별">
            <SelectComponent certificates={["모든 성별", "남자", "여자"]} />
          </SelectContainer>
          <SelectContainer title="자격증">
            <SelectComponent
              caption="日本語  🇯🇵"
              certificates={["N1", "N2", "N3", "N4", "N5"]}
              style={{ width: 50 }}
            />
            <SelectComponent
              caption="English  🇬🇧"
              certificates={["900>", "800>", "700>", "600>", "<600"]}
              style={{ width: 50 }}
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
                  }}
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
