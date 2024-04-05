import { View, StyleSheet, Text } from "react-native";
import { Plans } from "@/interface/Plan";
import { useEffect, useState } from "react";
import { getPlanList } from "@/api/PlanApi";
import { useQuery } from "@tanstack/react-query";
import PlanItem from "../plan/PlanItem";

function GuideDetailPlan() {
  const [plans, setPlans] = useState<Plans[]>([]);

  const { data } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlanList(1),
  });

  useEffect(() => {
    if (data) {
      setPlans(data);
    }
    console.log(plans);
  }, [data]);

  return (
    <View style={styles.container}>
      {data ? (
        plans.map((plan) => <PlanItem plan={plan} />)
      ) : (
        <View style={styles.noPlanContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            플랜이 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
}

export default GuideDetailPlan;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 500,
    paddingVertical: 10,
    alignItems: "center",
  },
  noPlanContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
