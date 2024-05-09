// Libraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Interface
import { dayPlan } from "@/interface/Plan";

// Components
import PlanDetailItem from "./PlanDetailItem";

const PlanDetailPlanTab = ({ item }: { item: dayPlan[] }) => {
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  const toggleDay = (id: number) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={styles.container}>
      {item.map((day) => (
        <View key={day.id} style={styles.schedule}>
          <TouchableOpacity
            onPress={() => toggleDay(day.id)}
            style={styles.header}
          >
            <Text style={styles.headerText}>{day.day}일차</Text>
          </TouchableOpacity>
          {!collapsed[day.id] && (
            <ScrollView style={styles.content}>
              {day.schedules.map((schedule, index) => (
                <PlanDetailItem
                  key={index}
                  item={schedule}
                  isLast={index === day.schedules.length - 1}
                />
              ))}
            </ScrollView>
          )}
        </View>
      ))}
    </View>
  );
};

export default PlanDetailPlanTab;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
  },
  schedule: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  header: {
    padding: 15,
    backgroundColor: "#007bff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  content: {
    padding: 10,
  },
});
