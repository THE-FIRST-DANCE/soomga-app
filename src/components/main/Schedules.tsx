import { View, Text, StyleSheet } from "react-native";

/* vector-icons */
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import Schedule from "./Schedule";
import { useState, useEffect } from "react";

type Schedule = {
  id: number;
  name: string;
  description: string;
  date_start: Date;
  date_end: Date;
};

function Schedules() {
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

  const [nearSchedule, setNearSchedule] = useState<Array<Schedule>>([]);

  const showNearSchedule = () => {
    schedules.sort((a, b) => a.date_start.getTime() - b.date_start.getTime());
    const nearSchedule = schedules.slice(0, 2);
    setNearSchedule(nearSchedule);
  };

  useEffect(() => {
    showNearSchedule();
  }, []);

  console.log(schedules);
  console.log(nearSchedule);

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
          onPress={() => console.log("Schedules Button Pressed!")}
        />
      </View>
      {nearSchedule.map((schedule) => (
        <Schedule
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
          description={schedule.description}
        />
      ))}
    </View>
  );
}

export default Schedules;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 15,
  },
  title: {
    height: 35,
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
  },
});
