import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type ScheduleType = {
  id: number;
  name: string;
  description: string;
  date_start: string;
  date_end: string;
};

function Schedule({
  id,
  name,
  description,
  date_start,
  date_end,
}: ScheduleType) {
  return (
    <TouchableOpacity
      style={styles.scheduleContainer}
      onPress={() => console.log(`Schedule ${id} button Pressed!`)}
    >
      <View style={styles.leftBar} />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          // style={{ ...styles.scheduleText, fontSize: 20, fontWeight: "700" }}
          style={[styles.scheduleText, styles.name]}
        >
          {name}
        </Text>
        <Text
          style={[styles.scheduleText, styles.description]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
      <View style={{ marginVertical: 10, position: "absolute", right: 10 }}>
        <Text style={styles.date}>{date_start}</Text>
        <Text style={styles.date}>{date_end}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Schedule;

const styles = StyleSheet.create({
  scheduleContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginHorizontal: 3,
    borderRadius: 10,
  },
  leftBar: {
    backgroundColor: "yellowgreen",
    width: 5,
    height: 50,
    borderRadius: 10,
  },
  scheduleText: {
    height: 50,
    marginHorizontal: 10,
    alignItems: "center",
    lineHeight: 50,
  },
  name: {
    width: 90,
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 10,
    width: 115,
  },
  date: {
    fontSize: 10,
    lineHeight: 15,
  },
});
