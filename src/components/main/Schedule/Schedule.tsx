import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

/* props */
type ScheduleType = {
  id: number;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
};

function Schedule({ name, description, start_time, end_time }: ScheduleType) {
  return (
    <View style={styles.container}>
      {/* 좌측 바 */}
      <View style={styles.leftBar} />
      <TouchableOpacity activeOpacity={0.5} style={styles.scheduleInformation}>
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
        <View style={{ marginVertical: 10, position: "absolute", right: 10 }}>
          {/* 일정 시작 시각 */}
          <Text style={styles.date}>{start_time}</Text>
          {/* 일정 종료 시각 */}
          <Text style={styles.date}>{end_time}</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  /* 일정 정보 View 스타일 */
  scheduleInformation: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 335,
    marginLeft: 5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  /* 이름, 설명, 시각 텍스트 공통 스타일 */
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
