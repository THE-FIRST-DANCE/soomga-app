import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import Colors from "@/modules/Color";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

interface DateTimeSectionProps {
  allDay: boolean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  setAllDay: (allDay: boolean) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
}

const DateTimeSection = ({
  allDay,
  startDate,
  endDate,
  startTime,
  endTime,
  setAllDay,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
}: DateTimeSectionProps) => {
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState<boolean>(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] =
    useState<boolean>(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] =
    useState<boolean>(false);

  return (
    <View style={styles.section}>
      <View style={styles.iconText}>
        <Ionicons name="time-outline" size={24} color="black" />
        <Text style={[styles.dateText, { flex: 1 }]}>종일</Text>
        <Checkbox
          value={allDay}
          onValueChange={setAllDay}
          color={Colors.PRIMARY}
          style={{ marginRight: 10 }}
        />
      </View>

      <View style={styles.notIconText}>
        <TouchableOpacity
          onPress={() => setStartDatePickerVisibility(true)}
          style={{ flex: 1 }}
        >
          <Text style={styles.dateText}>{startDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isStartDatePickerVisible}
          onConfirm={(date) => {
            setStartDate(format(date, "yyyy-MM-dd"));
            setStartDatePickerVisibility(false);
          }}
          mode="date"
          onCancel={() => setStartDatePickerVisibility(false)}
        />
        {!allDay && (
          <View style={styles.notIconText}>
            <TouchableOpacity
              onPress={() => setStartTimePickerVisibility(true)}
            >
              <Text style={styles.dateText}>{startTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isStartTimePickerVisible}
              onConfirm={(date) => {
                setStartTime(format(date, "hh:mmaaaaa'm'"));
                setStartTimePickerVisibility(false);
              }}
              mode="time"
              onCancel={() => setStartTimePickerVisibility(false)}
            />
          </View>
        )}
      </View>

      <View style={styles.notIconText}>
        <TouchableOpacity
          onPress={() => setEndDatePickerVisibility(true)}
          style={{ flex: 1 }}
        >
          <Text style={styles.dateText}>{endDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isEndDatePickerVisible}
          onConfirm={(date) => {
            setEndDate(format(date, "yyyy-MM-dd"));
            setEndDatePickerVisibility(false);
          }}
          mode="date"
          onCancel={() => setEndDatePickerVisibility(false)}
        />

        {!allDay && (
          <View style={styles.notIconText}>
            <TouchableOpacity onPress={() => setEndTimePickerVisibility(true)}>
              <Text style={styles.dateText}>{endTime}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={isEndTimePickerVisible}
              onConfirm={(date) => {
                setEndTime(format(date, "hh:mmaaaaa'm'"));
                setEndTimePickerVisibility(false);
              }}
              mode="time"
              onCancel={() => setEndTimePickerVisibility(false)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_DARK,
    paddingVertical: 25,
    gap: 20,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  notIconText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 44,
  },
  dateText: {
    fontSize: 20,
  },
});

export default DateTimeSection;
