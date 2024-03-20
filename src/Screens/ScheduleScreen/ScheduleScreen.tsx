import Screen from "@/components/Screen";
import { EventData } from "@/interface/Event";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";

const TESTEVENTS = [
  {
    title: "test",
    start: "2024-02-28T15:00:00.000Z",
    end: "2024-02-29T14:30:00.000Z",
    allDay: true,
    description: "test",
    id: 1,
    memberId: 1,
  },
  {
    title: "test2",
    start: "2024-03-01T15:00:00.000Z",
    end: "2024-03-03T14:30:00.000Z",
    allDay: true,
    description: "test",
    id: 2,
    memberId: 1,
  },
  {
    title: "test3",
    start: "2024-02-29T15:00:00.000Z",
    end: "2024-03-01T14:30:00.000Z",
    allDay: true,
    description: "test",
    id: 3,
    memberId: 1,
  },
];

const ScheduleScreen = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const setMarkedDate = (
    date: string,
    startingDay: boolean,
    endingDay: boolean
  ) => {
    setMarkedDates((prevMarkedDates) => ({
      ...prevMarkedDates,
      [date]: {
        periods: [
          ...((prevMarkedDates[date] && prevMarkedDates[date].periods) || []),
          {
            startingDay,
            endingDay,
            color: "blue",
          },
        ],
      },
    }));
  };

  const setMarkedDatesFromEvents = (events: EventData[]) => {
    events.forEach((event) => {
      const startDate = new Date(event.start.split("T")[0]);
      const endDate = new Date(event.end.split("T")[0]);
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateStr = d.toISOString().split("T")[0];

        const isStartingDay = d.getTime() === startDate.getTime();
        const isEndingDay = d.getTime() === endDate.getTime();

        setMarkedDate(dateStr, isStartingDay, isEndingDay);
      }
    });
  };

  useEffect(() => {
    setMarkedDates({});
    setMarkedDatesFromEvents(TESTEVENTS);
  }, []);

  return (
    <Screen title="일정 작성">
      <Calendar
        style={styles.calendarStyle}
        markingType="multi-period"
        markedDates={markedDates}
      />
    </Screen>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  calendarStyle: {
    height: "100%",
  },
});
