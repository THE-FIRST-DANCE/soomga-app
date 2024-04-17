import Colors from "@/modules/Color";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { ServiceProps } from "./ChatReservationModal";
import { useState } from "react";

function ServiceProposal({
  selectedService,
}: {
  selectedService: ServiceProps;
}) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startDateVisible, setStartDateVisible] = useState<boolean>(false);

  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endDateVisible, setEndDateVisible] = useState<boolean>(false);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${year}. ${month}. ${day} ${hour}:${minute}`;
  };

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20 }}>선택된 서비스</Text>
        <View style={styles.inputSection}>
          <Text style={{ fontSize: 20 }}>{selectedService.title}</Text>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>제목</Text>
        <View style={styles.inputSection}>
          <TextInput />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>시작일자</Text>
        <Pressable
          style={styles.inputSection}
          onPress={() => setStartDateVisible(true)}
        >
          <DateTimePicker
            isVisible={startDateVisible}
            mode="date"
            onConfirm={setStartDate}
            onCancel={() => setStartDateVisible(false)}
            date={startDate}
          />
          <Text>{formatDate(startDate)}</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>종료일자</Text>
        <Pressable
          style={styles.inputSection}
          onPress={() => setEndDateVisible(true)}
        >
          <DateTimePicker
            isVisible={endDateVisible}
            mode="datetime"
            onConfirm={setEndDate}
            onCancel={() => setEndDateVisible(false)}
            date={endDate}
          />
          <Text>{formatDate(endDate)}</Text>
        </Pressable>
      </View>
      <View style={styles.button}>
        <Text
          style={{
            color: Colors.WHITE,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          제안
        </Text>
      </View>
    </View>
  );
}

export default ServiceProposal;

const styles = StyleSheet.create({
  inputSection: {
    width: "100%",
    height: 50,
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    justifyContent: "center",
  },
  button: {
    width: 90,
    height: 45,
    marginTop: 40,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    alignSelf: "flex-end",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
