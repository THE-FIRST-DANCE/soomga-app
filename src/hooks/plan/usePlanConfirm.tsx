import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { RouteProp, useRoute } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { provinces } from "@/data/region";
import { PlanConfirmListItem, Plans } from "@/interface/Plan";
import { PlanConfirm, PlanConfirmList } from "@/state/store/PlanRecoil";
import { getPlanById } from "@/api/PlanApi";

export const usePlanConfirm = () => {
  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanConfirmScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { planId } = route.params; // 여행 정보
  const [planConfirmList, setPlanConfirmList] = useRecoilState(PlanConfirmList);
  const [planConfirm, setPlanConfirm] = useState<PlanConfirm>(planConfirmList);

  const { mutate } = useMutation({
    mutationFn: () => getPlanById(Number(planId)),
    onSuccess: (data: Plans) => {
      const periodPlan: { [key: number]: PlanConfirmListItem[] } = {};

      const lat = provinces.find((item) => item.name === data.region)?.lat;
      const lng = provinces.find((item) => item.name === data.region)?.lng;

      data.daySchedules.forEach((item) => {
        periodPlan[item.day] = item.schedules;
      });

      setPlanConfirm({
        periodPlan,
        transport: data.transport,
        info: {
          title: data.title,
          province: data.region,
          lat: lat || 0,
          lng: lng || 0,
          period: data.period,
        },
      });

      setPlanConfirmList({
        periodPlan,
        transport: data.transport,
        info: {
          title: data.title,
          province: data.region,
          lat: lat || 0,
          lng: lng || 0,
          period: data.period,
        },
      });
    },
  });

  useEffect(() => {
    if (planId) {
      mutate();
    }
  }, [planId, mutate]);

  useEffect(() => {
    setPlanConfirm(planConfirmList);
  }, [planConfirmList]);

  return {
    planConfirm,
  };
};
