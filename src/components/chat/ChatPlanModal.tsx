import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalModal from "@/components/Modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { getPlanList } from "@/api/PlanApi";
import { useQuery } from "@tanstack/react-query";
import { Plans } from "@/interface/Plan";
import PlanItem from "../plan/PlanItem";
import Colors from "@/modules/Color";

interface ChatPlanModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function ChatPlanModal({ visible, setVisible }: ChatPlanModalProps) {
  const [plans, setPlans] = useState<Plans[]>([]);

  const { data } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlanList(1),
  });

  useEffect(() => {
    if (data) {
      setPlans(data);
    }
  }, [data]);

  const [isPlanDetailOpen, setIsPlanDetailOpen] = useState<boolean>(false);
  const [rotateAnimation] = useState<Animated.Value>(new Animated.Value(0));

  const toggleRotation = () => {
    setIsPlanDetailOpen(!isPlanDetailOpen);

    Animated.timing(rotateAnimation, {
      toValue: !isPlanDetailOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <GlobalModal
      animation="slide"
      type="full"
      visible={visible}
      setVisible={setVisible}
    >
      <AntDesign
        name="close"
        size={30}
        color="black"
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>내 플랜 리스트</Text>
        {/* 플랜 리스트 */}
        <ScrollView contentContainerStyle={styles.planList}>
          {data ? (
            plans.map((plan) => <PlanItem key={plan.id} plan={plan} />)
          ) : (
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                플랜이 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </GlobalModal>
  );
}

export default ChatPlanModal;

const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  plan: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    elevation: 5,
  },
  planList: {
    flex: 1,
    gap: 20,
    marginTop: 20,
  },
});
