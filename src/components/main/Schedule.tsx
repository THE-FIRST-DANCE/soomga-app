import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

type ScheduleType = {
  id: number;
  name: string;
  description: string;
};

function Schedule({ id, name, description }: ScheduleType) {
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
          style={{ ...styles.scheduleText, fontSize: 20, fontWeight: "700" }}
        >
          {name}
        </Text>
        <Text style={{ ...styles.scheduleText, fontSize: 10 }}>
          {description}
        </Text>
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
});
