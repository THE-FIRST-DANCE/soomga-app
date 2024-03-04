import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
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

/* vector-icons */
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
  const nicknameRegex = /^[가-힣a-zA-Zㄱ-ㅎ]{2,}$/;

  const isNicknameValid = (nickname: string): boolean => {
    return nicknameRegex.test(nickname);
  };

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

  return (
    <View style={{ marginHorizontal: 25 }}>
      <View>
        {/* 제목, 부제목 */}
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>
          여행의 시작, {"\n"}
          <Text style={styles.soomgaText}>SOOMGA</Text>
          <Text>와 함께라면</Text> {"\n"}
          당신만의 특별한 여행이 펼쳐집니다.
        </Text>
        <KeyboardAvoidingView style={{ marginTop: 30 }}>
          <InputText
            title="닉네임"
            placeholder="닉네임"
            onChangeText={handleNicknameInputChange}
          />
          {nicknameInputValue !== "" &&
            !isNicknameValid(nicknameInputValue) && (
              <Text style={{ color: "red" }}>
                닉네임은 2글자 이상이어야 합니다.
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
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate("Tags Select")}
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
    marginTop: 100,
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
