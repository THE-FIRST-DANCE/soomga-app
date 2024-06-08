import { ExecutePlanState } from "@/state/store/PlanRecoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const LoadExecutePlan = () => {
  const setExecutePlan = useSetRecoilState(ExecutePlanState);

  useEffect(() => {
    const loadExecutePlan = async () => {
      try {
        const executePlan = await AsyncStorage.getItem("executedPlan");

        if (executePlan) {
          setExecutePlan({
            planId: JSON.parse(executePlan).planId,
            executePlanId: JSON.parse(executePlan).executePlanId,
          });
        }
      } catch (error) {
        console.error("Failed to load execute plan", error);
      }
    };

    loadExecutePlan();
  }, [setExecutePlan]);

  return null;
};
