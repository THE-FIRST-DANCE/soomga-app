import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { CurrentPeriod, PlanConfirm } from "@/state/store/PlanRecoil";
import Colors from "@/modules/Color";

interface PlanConfirmPeriodModalProps {
  period: number;
  setModalVisible: (visible: boolean) => void;
}

export const PlanConfirmPeriodModal = ({
  period,
  setModalVisible,
}: PlanConfirmPeriodModalProps) => {
  const [currentPeriod, setCurrentPeriod] = useRecoilState(CurrentPeriod);

  return (
    <View style={styles.modal}>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: "50%",
          top: 5,
        }}
      >
        <AntDesign
          name="down"
          size={16}
          color="black"
          onPress={() => setModalVisible(false)}
        />
      </TouchableOpacity>
      <Text style={styles.modalHeaderText}>일정 선택</Text>
      <ScrollView>
        {Array.from({ length: period }, (_, i) => i + 1).map((item, index) => (
          <TouchableOpacity
            key={`${item}-${index}`}
            style={styles.modalList}
            onPress={() => {
              setCurrentPeriod(item);
              setModalVisible(false);
            }}
          >
            <Text
              style={[
                styles.periodText,
                currentPeriod === item && styles.selectedText,
              ]}
            >
              {item} 일차
            </Text>
            {currentPeriod === item && (
              <AntDesign name="check" size={20} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalList: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  periodText: {
    fontSize: 20,
  },
  selectedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
});
