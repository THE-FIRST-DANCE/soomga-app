import Screen from "@/components/Screen";
import { PlanInfo } from "@/state/store/PlanRecoil";
import React, { useContext } from "react";
import { useRecoilValue } from "recoil";

const PlanPlaceSelectScreen = () => {
  const planInfo = useRecoilValue(PlanInfo);

  console.log(planInfo);

  return <Screen title="장소 선택"></Screen>;
};

export default PlanPlaceSelectScreen;
