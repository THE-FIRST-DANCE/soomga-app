import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

/* components */
import InputText from "@profile/InputText";
import NextButton from "@profile/NextButton";

/* Navigation */
import {
  MyNavigationProp,
  RootStackParamList,
} from "@navigation/NavigationProps";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

/* vector-icons */
import { Entypo } from "@expo/vector-icons";
import TitleSubtitle from "./TitleSubtitle";

type onChangeType = (
  event: DateTimePickerEvent,
  selectedDate: Date | undefined
) => void;

type handleValueChangeType = (itemValue: string, itemIndex: number) => void;

function NicknameGender() {
  /* 닉네임 유효성 검사 */
  const [nicknameInputValue, setNicknameInputValue] = useState<string>("");

  const handleNicknameInputChange = (text: string) => {
    setNicknameInputValue(text);
  };

  /* 닉네임 정규식 */
  const nicknameRegex = /^[가-힣a-zA-Zㄱ-ㅎ0-9]{2,12}$/;

  const isNicknameValid = (nickname: string): boolean => {
    return nicknameRegex.test(nickname);
  };

  /* --------------------------------------------------------------------------------- */

  /* 닉네임이 유효성 검사를 통과했을 때에만 다음 페이지로 넘어가도록 구현 */
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setIsNextButtonDisabled(
      nicknameInputValue === "" || !isNicknameValid(nicknameInputValue)
    );
  }, [nicknameInputValue]);

  /* --------------------------------------------------------------------------------- */

  /* 날짜 설정 */
  const [date, setDate] = useState<Date>(new Date());

  /* 날짜 선택할 달력 표시 여부 */
  const [showDatePicker, setShowDatePicker] = useState(false);

  /* 날짜 선택 후 이벤트 처리 */
  const onChange: onChangeType = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  /* 날짜 형식 변환 */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${year}-${month}-${day}`;
  };

  /* --------------------------------------------------------------------------------- */

  /* 성별 설정 */
  const [selectedGender, setSelectedGender] = useState<string>("남자");

  const handleValueChange: handleValueChangeType = (itemValue, itemIndex) => {
    setSelectedGender(itemValue);
  };

  /* --------------------------------------------------------------------------------- */

  /* navigation 추가 */
  const navigation =
    useNavigation<MyNavigationProp<keyof RootStackParamList>>();

  /* route 추가 */
  const route = useRoute<RouteProp<RootStackParamList, "Nickname & Gender">>();
  const { data } = route.params;
  const routeData = data;

  return (
    <View style={{ marginHorizontal: 25 }}>
      <View>
        <TitleSubtitle />
        <KeyboardAvoidingView style={{ marginTop: 30 }}>
          <InputText
            title="닉네임"
            placeholder="닉네임"
            onChangeText={handleNicknameInputChange}
          />
          {nicknameInputValue !== "" &&
            !isNicknameValid(nicknameInputValue) && (
              <Text style={{ color: "red" }}>
                닉네임은 2글자 이상, 12글자 이하여야 합니다.
              </Text>
            )}
          <View style={{ marginTop: 30 }}>
            <Text style={{ fontSize: 20 }}>생년월일</Text>
            <View style={styles.birthDateContainer}>
              <Entypo
                name="calendar"
                size={30}
                color="black"
                style={{ marginTop: 20 }}
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  onChange={onChange}
                  display="default"
                />
              )}
              <Text style={styles.birthDate}>{formatDate(date)}</Text>
            </View>
          </View>
          <View style={styles.picker}>
            <Text style={{ fontSize: 20 }}>성별</Text>
            <Picker
              selectedValue={selectedGender}
              onValueChange={handleValueChange}
              mode="dropdown"
            >
              <Picker.Item label="남자" value="male" />
              <Picker.Item label="여자" value="female" />
            </Picker>
          </View>
        </KeyboardAvoidingView>
      </View>
      <NextButton
        style={[
          isNextButtonDisabled ? { opacity: 0.4 } : { opacity: 1 },
          { marginTop: 40 },
        ]}
        onPress={() => {
          const data = {
            ...routeData,
            nickname: nicknameInputValue,
            birthDate: date.toISOString(),
          };

          console.log(data);
          navigation.navigate("Tags Select", { data: data });
        }}
        disabled={isNextButtonDisabled}
      />
    </View>
  );
}

export default NicknameGender;

const styles = StyleSheet.create({
  /* 제목 텍스트 스타일 */
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 50,
  },
  /* 부제목 스타일 */
  subtitle: {
    fontSize: 15,
    marginTop: 20,
  },
  /* soomga 텍스트 스타일 */
  soomgaText: {
    color: "#DC2626",
  },
  /* 생년월일 컨테이너 스타일 */
  birthDateContainer: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    width: 320,
    height: 60,
    paddingHorizontal: 7,
  },
  /* 생년월일 텍스트 스타일 */
  birthDate: { lineHeight: 70, marginLeft: 10, fontSize: 20 },
  /* 성별 Picker 스타일 */
  picker: { marginTop: 30, borderBottomWidth: 1.5, width: 320 },
});
