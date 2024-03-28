import Screen from "@/components/Screen";
import { EventData } from "@/interface/Event";
import Colors from "@/modules/Color";
import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/api/EventApi";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScheduleStackParamList } from "@/stacks/ScheduleStack";

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [markers, setMarkers] = useState<MarkedDates>({});

  const navigation = useNavigation<NavigationProp<ScheduleStackParamList>>();

  // 이벤트 데이터 가져오기
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvent(1),
  });

  useEffect(() => {
    if (data) {
      setAllEvents(data);
    }
  }, [data]);

  // 이벤트를 날짜별로 파싱
  const parsedMarkers = useMemo<MarkedDates>(() => {
    const initialValue: MarkedDates = {};
    const emptyPeriod = { color: "transparent" };

    return (
      allEvents
        ?.sort((a, b) => {
          // Filter larger date ranges to be top-most.
          const aStart = startOfDay(new Date(a.start));
          const aEnd = endOfDay(new Date(a.end));
          const bStart = startOfDay(new Date(b.start));
          const bEnd = endOfDay(new Date(b.end));

          return (
            differenceInDays(bEnd, bStart) - differenceInDays(aEnd, aStart)
          );
        })
        .reduce((prev, curr) => {
          const color = Colors.PRIMARY;
          const start = startOfDay(new Date(curr.start));
          const end = endOfDay(new Date(curr.end));
          const totalDays = differenceInDays(end, start) + 1;

          let rowIndex = 0;
          let freeRowFound = false;
          while (!freeRowFound) {
            freeRowFound = true;
            for (let i = 0; i < totalDays; i++) {
              const date = addDays(start, i);
              const dateStr = format(date, "yyyy-MM-dd");

              const period = prev[dateStr]?.periods?.[rowIndex];
              if (period) {
                if (isWithinInterval(date, { start, end })) {
                  rowIndex++;
                  freeRowFound = false;
                  break;
                }
              }
            }
          }

          for (let i = 0; i < totalDays; i++) {
            const date = addDays(start, i);
            const dateStr = format(date, "yyyy-MM-dd");

            let marking = prev[dateStr];
            if (marking === undefined) {
              marking = {};
            }

            if (marking.periods === undefined) {
              marking.periods = [];
            }

            if (marking.periods.length <= rowIndex) {
              marking.periods = marking.periods.concat(
                [...Array(rowIndex + 1 - marking.periods.length)].map(() => ({
                  ...emptyPeriod,
                }))
              );
            }

            marking.periods[rowIndex] = {
              color: color,
              startingDay: i === 0,
              endingDay: i === totalDays - 1,
            };

            prev[dateStr] = marking;
          }

          return prev;
        }, initialValue) ?? initialValue
    );
  }, [allEvents]);

  useEffect(() => {
    const updateMarkers = {
      ...parsedMarkers,
      [selectedDate]: {
        ...parsedMarkers[selectedDate],
        selected: true,
      },
    };

    setMarkers(updateMarkers);
  }, [parsedMarkers, selectedDate]);

  useEffect(() => {
    filterEventsByDate(selectedDate);
  }, [selectedDate]);

  const filterEventsByDate = (date: string) => {
    const filteredEvents = allEvents.filter((event) => {
      const start = startOfDay(new Date(event.start));
      const end = endOfDay(new Date(event.end));

      return isWithinInterval(new Date(date), { start, end });
    });

    setFilteredEvents(filteredEvents);
  };

  const renderEvent = (event: EventData) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScheduleDetailScreen", {
            event: event,
          });
        }}
        style={styles.EventWrapper}
      >
        {event.allDay ? (
          <MaterialIcons name="event" size={24} color={Colors.GRAY_DARK} />
        ) : (
          <MaterialIcons name="schedule" size={24} color={Colors.GRAY_DARK} />
        )}
        <View style={styles.EventInfo}>
          <Text style={styles.EventTitle}>{event.title}</Text>
          <Text style={styles.EventDate}>
            {event.allDay
              ? `${format(new Date(event.start), "MM월 dd일")} ~ ${format(
                  new Date(event.end),
                  "MM월 dd일"
                )}`
              : `${format(new Date(event.start), "HH:mm")} ~ ${format(
                  new Date(event.end),
                  "HH:mm"
                )}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen title="일정 작성">
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
      {/* 이벤트 */}
      <FlatList
        ListHeaderComponent={() => (
          <Text style={styles.EventDay}>
            {format(new Date(selectedDate), "MM월 dd일")}
          </Text>
        )}
        style={styles.EventList}
        data={filteredEvents}
        renderItem={({ item }) => renderEvent(item)}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.EventLine} />}
      />

      {/* 일정 추가 버튼 */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScheduleCreateScreen", {
            date: selectedDate,
          });
        }}
        style={styles.PlusButton}
      >
        <MaterialIcons name="add" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </Screen>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  EventList: {
    flex: 1,
    padding: 10,
  },
  EventDay: {
    fontSize: 14,
    marginBottom: 10,
  },
  EventWrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 15,
  },
  EventInfo: {
    flexDirection: "column",
    gap: 2,
  },
  EventTitle: {
    fontSize: 18,
  },
  EventDate: {
    fontSize: 12,
    color: Colors.GRAY_DARK,
  },
  EventLine: {
    height: 0.2,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.GRAY_DARK,
  },
  PlusButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 100,
  },
  DetailHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    right: 0,
    padding: 10,
    gap: 20,
  },
  Section: {
    width: "100%",
    paddingVertical: 15,
    gap: 20,
  },
  IconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  NotIconText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 44,
  },
});
