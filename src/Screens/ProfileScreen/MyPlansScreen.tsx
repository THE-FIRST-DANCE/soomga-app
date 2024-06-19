import { getPlanList } from "@/api/PlanApi";
import PlanItem from "@/components/plan/PlanItem";
import Screen from "@/components/Screen";
import { Plans } from "@/interface/Plan";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function MyPlansScreen() {
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

  return (
    <Screen title="내 플랜">
      <View style={styles.container}>
        {data && plans.length > 0 ? (
          plans.map((plan) => <PlanItem plan={plan} />)
        ) : (
          <View style={styles.noPlanContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              플랜이 없습니다.
            </Text>
          </View>
        )}
      </View>
    </Screen>
  );
}

export default MyPlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noPlanContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
