import Screen from "@/components/Screen";
import { ScheduleStackParamList } from "@/stacks/ScheduleStack";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "@/api/EventApi";

const ScheduleDetailScreen = () => {
  type PlanEditScreenRouteProp = RouteProp<
    ScheduleStackParamList,
    "ScheduleDetailScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { event } = route.params;

  const naviation = useNavigation<NavigationProp<ScheduleStackParamList>>();

  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      naviation.goBack();
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const onDeleteHandler = () => {
    deleteMutate(event?.id as number);
  };

  return (
    <Screen>
      <View style={styles.Conatiner}>
        <Text style={styles.Title}>{event.title}</Text>

        {/* 시간 섹션 */}
        <View style={styles.Section}>
          <View style={styles.IconText}>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text style={[styles.DateText, { flex: 1 }]}>종일</Text>
            <Checkbox
              value={event.allDay}
              color={Colors.PRIMARY}
              style={{ marginRight: 10 }}
            />
          </View>
          <View style={styles.NotIconText}>
            <View style={{ flex: 1 }}>
              <Text style={styles.DateText}>{`${format(
                new Date(event.start),
                "yyyy-MM-dd"
              )}`}</Text>
            </View>

            {!event.allDay && (
              <View>
                <Text style={styles.DateText}>{`${format(
                  new Date(event.start),
                  "hh:mmaaaaa'm'"
                )}`}</Text>
              </View>
            )}
          </View>
          <View style={styles.NotIconText}>
            <View style={{ flex: 1 }}>
              <Text style={styles.DateText}>{`${format(
                new Date(event.end),
                "yyyy-MM-dd"
              )}`}</Text>
            </View>

            {!event.allDay && (
              <View>
                <Text style={styles.DateText}>{`${format(
                  new Date(event.end),
                  "hh:mmaaaaa'm'"
                )}`}</Text>
              </View>
            )}
          </View>
        </View>

        {/* 알림 섹션 */}

        {/* 설명 섹션 */}
        {event.description && (
          <View style={styles.Section}>
            <View style={styles.IconText}>
              <MaterialCommunityIcons
                name="text-long"
                size={24}
                color="black"
              />
              <Text style={{ flex: 1 }}>{event.description}</Text>
            </View>
          </View>
        )}

        {/* 플랜 섹션 */}
        {event.plan && (
          <View style={styles.Section}>
            <View style={styles.IconText}>
              <MaterialIcons name="event" size={24} color={Colors.GRAY_DARK} />

              <View style={styles.PlanBox}>
                <View style={styles.PlanContainer}>
                  <Text style={styles.PlanName}>{event.plan?.title}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Ionicons name="time-outline" size={24} color="black" />
                    <Text style={styles.PlanPeriod}>
                      {event.plan?.period}일
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* 편집, 삭제 버튼 */}
      <View style={styles.Confirm}>
        <TouchableOpacity
          onPress={() => {
            naviation.navigate("ScheduleCreateScreen", {
              date: format(new Date(event.start), "yyyy-MM-dd"),
              editEvent: event,
            });
          }}
          style={styles.ConfirmButton}
        >
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="mode-edit" size={24} color="black" />
            <Text style={styles.ConfirmText}>편집</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDeleteHandler}
          style={styles.ConfirmButton}
        >
          <MaterialIcons name="delete" size={24} color="black" />
          <Text style={styles.ConfirmText}>삭제</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    padding: 20,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  Section: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_DARK,
    paddingVertical: 25,
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
  DateText: {
    fontSize: 20,
  },
  PlanBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    gap: 10,
  },
  PlanTitle: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: "bold",
  },
  PlanContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  PlanName: {
    fontSize: 16,
  },
  PlanPeriod: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  Confirm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_DARK,
  },
  ConfirmButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.GRAY_MEDIUM,
    padding: 20,
  },
  ConfirmText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ScheduleDetailScreen;
