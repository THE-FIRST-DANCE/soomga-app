import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import GlobalModal from "@/components/Modal";
import { Plans } from "@/interface/Plan";

interface PlanSectionProps {
  planList: Plans[];
  selectedPlan: Plans | null;
  setSelectedPlan: (plan: Plans | null) => void;
}

const PlanSection = ({
  planList,
  selectedPlan,
  setSelectedPlan,
}: PlanSectionProps) => {
  const [isPlanModalVisible, setPlanModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.section}>
      <View style={styles.IconText}>
        <MaterialIcons name="event" size={24} color={Colors.GRAY_DARK} />
        {selectedPlan ? (
          <View style={styles.PlanBox}>
            <View style={styles.PlanContainer}>
              <Text style={styles.planName}>{selectedPlan.title}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Ionicons name="time-outline" size={24} color="black" />
                <Text style={styles.planPeriod}>{selectedPlan.period}일</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSelectedPlan(null);
              }}
            >
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setPlanModalVisible(true);
            }}
            style={styles.PlanBox}
          >
            <FontAwesome6 name="angle-down" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <GlobalModal
        visible={isPlanModalVisible}
        setVisible={setPlanModalVisible}
        type="bottom"
      >
        <Text style={styles.PlanTitle}>일정에 저장할 플랜</Text>
        <FlatList
          data={planList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedPlan(item);
                setPlanModalVisible(false);
              }}
            >
              <View style={styles.listItem}>
                <Text style={styles.planName}>{item.title}</Text>
                <Text style={styles.planPeriod}>{item.period}일</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </GlobalModal>
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
  IconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_LIGHT,
  },
  planName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  planPeriod: {
    fontSize: 14,
    color: Colors.GRAY_DARK,
  },
  PlanTitle: {
    fontSize: 18,
    color: Colors.BLACK,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default PlanSection;
