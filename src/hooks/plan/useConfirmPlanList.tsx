import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { PlanConfirmList, CurrentPeriod } from "@/state/store/PlanRecoil";

export const usePlanList = () => {
  const planConfirmList = useRecoilValue(PlanConfirmList);
  const currentPeriod = useRecoilValue(CurrentPeriod);

  const planList = planConfirmList.periodPlan[currentPeriod] || [];

  const markers = useMemo(
    () =>
      planList.map((item, index) => ({
        position: {
          lat: item.item.latitude,
          lng: item.item.longitude,
        },
        icon: "https://cdn0.iconfinder.com/data/icons/font-awesome-solid-vol-3/512/map-marker-64.png",
        title: index + 1,
      })),
    [planList]
  );

  return { markers };
};
