import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import {
  CurrentPeriod,
  PlanConfirm,
  PlanConfirmList,
} from "@/state/store/PlanRecoil";
import { PlanConfirmListItem, Plans } from "@/interface/Plan";
import { provinces } from "@/data/region";

export const usePlanConfirm = (plan: Plans | null) => {
  const planConfirmList = useRecoilValue(PlanConfirmList);
  const [confirmList, setConfirmList] = useState<PlanConfirm | null>(null);
  const currentPeriod = useRecoilValue(CurrentPeriod);
  const [planList, setPlanList] = useState<PlanConfirmListItem[]>(
    [] as PlanConfirmListItem[]
  );

  useEffect(() => {
    if (confirmList) {
      setPlanList(confirmList.periodPlan[currentPeriod]);
    }
  }, [confirmList, currentPeriod]);

  useEffect(() => {
    if (plan) {
      const periodPlan: { [key: number]: PlanConfirmListItem[] } = {};

      const lat = provinces.find((item) => item.label === plan.region)?.lat;
      const lng = provinces.find((item) => item.label === plan.region)?.lng;

      plan.daySchedules.forEach((item) => {
        periodPlan[item.day] = item.schedules;
      });

      setConfirmList({
        periodPlan,
        transport: plan.transport,
        info: {
          title: plan.title,
          province: plan.region,
          lat: lat || 0,
          lng: lng || 0,
          period: plan.period,
        },
      });
    } else {
      setConfirmList(planConfirmList);
    }
  }, [plan]);

  return { confirmList, planList };
};
