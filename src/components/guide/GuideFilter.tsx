import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";

import { Slider } from "@miblanchard/react-native-slider";
import Colors from "@/modules/Color";
import { AntDesign, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { styles as TagStyle } from "../main/Tags";

interface SliderProps {
  caption: string;
  minimumValue: number;
  maximumValue: number;
  step: number;
  range: number[];
  setRange: (value: number[]) => void;
}

function RangeSliderComponent({
  caption,
  minimumValue,
  maximumValue,
  step,
  range,
  setRange,
}: SliderProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.caption}>{caption}</Text>
      <View style={styles.sliderContainer}>
        <Text style={{ fontSize: 20 }}>
          {range[0]}　　 ~ 　　 {range[1]}
        </Text>
        <Slider
          containerStyle={{ width: 300 }}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          value={range}
          onValueChange={setRange}
          step={step}
          thumbTintColor={Colors.BASKETBALL_ORANGE}
          minimumTrackTintColor={Colors.BASKETBALL_ORANGE}
          thumbStyle={{
            backgroundColor: Colors.WHITE,
            elevation: 10,
          }}
        />
      </View>
    </View>
  );
}

interface SelectProps {
  caption?: string;
  certificates: string[];
}

function SelectContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.caption}>{title}</Text>
      <View>
        <View style={styles.selectContainer}>{children}</View>
      </View>
    </View>
  );
}

function SelectComponent({ caption, certificates }: SelectProps) {
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        {caption && <Text style={{ paddingHorizontal: 10 }}>{caption}</Text>}
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {certificates.map((certificate, index) => (
            <View
              key={index}
              style={{
                ...TagStyle.tag,
                marginHorizontal: 5,
                alignItems: "center",
              }}
            >
              <Text>{certificate}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

interface CheckboxProps {
  isChecked: boolean;
  count: number;
  onPress: () => void;
}

function StarsCheckbox({ isChecked, count, onPress }: CheckboxProps) {
  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      {isChecked ? (
        <MaterialIcons
          name="check-box"
          size={24}
          color="black"
          onPress={onPress}
        />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={24}
          color="black"
          onPress={onPress}
        />
      )}

      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        {[...Array(count)].map((_, index) => (
          <Fontisto
            key={index}
            name="star"
            size={24}
            color={Colors.STAR_YELLOW}
            onPress={onPress}
            style={{ marginHorizontal: 3 }}
          />
        ))}
      </View>
    </View>
  );
}

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
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* 나이 범위 선택 */}
          <RangeSliderComponent
            caption="나이"
            minimumValue={10}
            maximumValue={70}
            step={10}
            range={ageRange}
            setRange={setAgeRange}
          />
          {/* 온도 범위 선택 */}
          <RangeSliderComponent
            caption="온도"
            minimumValue={0}
            maximumValue={100}
            step={1}
            range={tempRange}
            setRange={setTempRange}
          />
          {/* 가이드 횟수 범위 선택 */}
          <RangeSliderComponent
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
              caption="日本語🇯🇵"
              certificates={["N1", "N2", "N3", "N4", "N5"]}
            />
            <SelectComponent
              caption="English🇬🇧"
              certificates={["900>", "800>", "700>", "600>", "<600"]}
            />
          </SelectContainer>
          <View>
            <Text style={styles.caption}>평점</Text>
            <View style={styles.selectContainer}>
              {isCheckedArray.map((isChecked, index) => (
                <StarsCheckbox
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
  sliderContainer: {
    height: 100,
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.GRAY_DARK,
    alignItems: "center",
  },
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
