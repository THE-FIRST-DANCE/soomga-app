// Libraries
import { endOfDay, format, isWithinInterval, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

// Components
import Screen from "@/components/Screen";

// Interface
import { EventData } from "@/interface/Event";
import { ScheduleStackParamList } from "@/stacks/ScheduleStack";
import Colors from "@/modules/Color";

// API
import { getEvent } from "@/api/EventApi";

// Hooks
import useParsedMarkers from "@/hooks/schedule/useParsedMarkers";

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const { markers } = useParsedMarkers({
    allEvents,
    selectedDate,
  });

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
