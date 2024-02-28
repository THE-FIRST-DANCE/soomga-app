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

/* components */
import InputText from "@profile/InputText";

/* vector-icons */
import { Entypo } from "@expo/vector-icons";

type onChangeType = (
  event: DateTimePickerEvent,
  selectedDate: Date | undefined
) => void;

function NicknameGender() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <View style={{ marginHorizontal: 25 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 제목, 부제목 */}
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>
          여행의 시작, {"\n"}
          <Text style={styles.soomgaText}>SOOMGA</Text>
          <Text>와 함께라면</Text> {"\n"}
          당신만의 특별한 여행이 펼쳐집니다.
        </Text>
        <KeyboardAvoidingView style={{ marginTop: 30 }}>
          <InputText title="닉네임" placeholder="닉네임" />
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
        </KeyboardAvoidingView>
      </ScrollView>
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
});
