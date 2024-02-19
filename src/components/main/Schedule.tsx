import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type ScheduleType = {
  id: number;
  name: string;
  description: string;
  date_start: string;
  date_end: string;
};

function Schedule({ name, description, date_start, date_end }: ScheduleType) {
  return (
    <TouchableOpacity style={styles.container}>
      {/* 좌측 바 */}
      <View style={styles.leftBar} />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {/* 일정 이름 */}
        <Text style={[styles.scheduleText, styles.name]}>{name}</Text>

        {/* 일정 설명 */}
        <Text
          style={[styles.scheduleText, styles.description]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
      <View style={{ marginVertical: 10, position: "absolute", right: 10 }}>
        {/* 일정 시작 시각 */}
        <Text style={styles.date}>{date_start}</Text>
        {/* 일정 종료 시각 */}
        <Text style={styles.date}>{date_end}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Schedule;

const styles = StyleSheet.create({
  /* 컨테이너 스타일 */
  container: {
    flexDirection: "row",
    marginTop: 5,
    marginHorizontal: 3,
    borderRadius: 10,
  },
  /* 좌측 바 스타일 */
  leftBar: {
    backgroundColor: "yellowgreen",
    width: 5,
    height: 50,
    borderRadius: 10,
  },
  /* 이름, 설명, 시각 공통 스타일 */
  scheduleText: {
    height: 50,
    marginHorizontal: 10,
    alignItems: "center",
    lineHeight: 50,
  },
  /* 일정 이름 스타일 */
  name: {
    width: 90,
    fontSize: 20,
    fontWeight: "700",
  },
  /* 일정 설명 스타일 */
  description: {
    fontSize: 10,
    width: 115,
  },
  /* 일정 시각 스타일 */
  date: {
    fontSize: 10,
    lineHeight: 15,
  },
});
