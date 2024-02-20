import { View, Text, StyleSheet } from "react-native";

/* vector-icons */
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import Schedule from "./Schedule";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  MyNavigationProp,
  RootStackParamList,
} from "../../navigation/NavigationProps";

type ScheduleType = {
  id: number;
  name: string;
  description: string;
  date_start: Date;
  date_end: Date;
};

function Schedules() {
  /* 임시 데이터 */
  const schedules = [
    {
      id: 1,
      name: "플랜 이름 1",
      description: "서울에서 하는 조선시대 역사 체험",
      date_start: new Date("2024-02-19T10:00:00"),
      date_end: new Date("2024-02-19T19:00:00"),
    },
    {
      id: 2,
      name: "플랜 이름 3",
      description: "부산 맛집 탐방",
      date_start: new Date("2024-02-21T10:00:00"),
      date_end: new Date("2024-02-21T19:00:00"),
    },
    {
      id: 3,
      name: "플랜 이름 2",
      description: "대구 동성로 맛집 탐방",
      date_start: new Date("2024-02-20T10:00:00"),
      date_end: new Date("2024-02-20T19:00:00"),
    },
  ];

  /* 가장 가까운 여행 일정(2개) 저장 */
  const [nearSchedule, setNearSchedule] = useState<Array<ScheduleType>>([]);

  const showNearSchedule = () => {
    schedules.sort((a, b) => a.date_start.getTime() - b.date_start.getTime());
    const nearSchedule = schedules.slice(0, 2);
    setNearSchedule(nearSchedule);
  };

  /* 날짜 형식 변환 */
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    /* minute이 0일 경우 00으로 변환 */
    const minute = date.getMinutes() === 0 ? "00" : date.getMinutes();

    return `${year}. ${month}. ${day} ${hour}:${minute}`;
  };

  /* navigation 추가 */
  const navigation =
    useNavigation<MyNavigationProp<keyof RootStackParamList>>();

  useEffect(() => {
    showNearSchedule();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <FontAwesome
          name="circle"
          size={20}
          color="red"
          style={{ marginLeft: 10 }}
        />
        <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
          여행 일정
        </Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={20}
          color="white"
          style={{ lineHeight: 50, position: "absolute", right: 10 }}
          onPress={() => navigation.navigate("여행 일정")}
        />
      </View>
      {nearSchedule.map((schedule) => (
        <Schedule
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
          description={schedule.description}
          date_start={formatDate(schedule.date_start)}
          date_end={formatDate(schedule.date_end)}
        />
      ))}
    </View>
  );
}

export default Schedules;

const styles = StyleSheet.create({
  /* 컨테이너 스타일 */
  container: {
    marginTop: 60,
    marginHorizontal: 15,
  },
  /* 제목 스타일 */
  title: {
    height: 35,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
  },
});
