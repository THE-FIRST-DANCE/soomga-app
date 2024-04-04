import { getEvent } from "@/api/EventApi";
import { EventData } from "@/interface/Event";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

const eventData: EventData[] = [];

function GuideDetailSchedule() {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const markers = {
    [selectedDate]: {
      selected: true,
    },
  };

  // 이벤트 데이터 가져오기
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvent(1),
  });

  useEffect(() => {
    if (data) {
      setAllEvents(data);
    }

    console.log(allEvents);
  }, [data]);

  return (
    <View style={styles.container}>
      <Calendar
        markingType="multi-period"
        markedDates={markers}
        monthFormat={"yyyy년 MM월"}
        current={selectedDate}
        theme={{
          selectedDayBackgroundColor: "#eef6ff",
          selectedDayTextColor: "#6491ff",
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />
    </View>
  );
}

export default GuideDetailSchedule;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 500,
  },
});
