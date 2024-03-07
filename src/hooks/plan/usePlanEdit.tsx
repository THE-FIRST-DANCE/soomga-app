import { useState, useEffect } from "react";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getPlaceRouteEdit } from "@/api/PlanApi";
import {
  CurrentPeriod,
  PlanConfirmList,
  PlanInfo,
  PlanPlaceBox,
} from "@/state/store/PlanRecoil";
import {
  PlaceData,
  PlanConfirmListItem,
  PlanConfirmPeriodList,
} from "@/interface/Plan";
import { PlanStackParamList } from "@/stacks/PlanStack";

interface P {
  data: PlanConfirmPeriodList;
  info: PlanInfo;
  transport: string;
}

export const usePlanEdit = ({ data, info, transport }: P) => {
  const currentPeriod = useRecoilValue(CurrentPeriod);
  const [planPlaceBox, setPlanPlaceBox] = useRecoilState(PlanPlaceBox);
  const setPlanConfirmList = useSetRecoilState(PlanConfirmList);
  const [modalVisible, setModalVisible] = useState(false);
  const [planList, setPlanList] = useState(data[currentPeriod] || []);
  const [allPeriodsData, setAllPeriodsData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  useEffect(() => {
    setPlanList(data[currentPeriod] || []);
  }, [data, currentPeriod]);

  const updatePlanList = (updatedPlanList: PlanConfirmListItem[]) => {
    setPlanList(updatedPlanList);
    setAllPeriodsData({
      ...allPeriodsData,
      [currentPeriod]: updatedPlanList,
    });
  };

  // 다음 버튼 클릭
  const onNext = async () => {
    setIsLoading(true);

    let updatedData: { [key: string]: PlanConfirmListItem[] } = {};

    for (const period in allPeriodsData) {
      const periodData = allPeriodsData[period].map((item) => ({
        item: item.item,
        order: 0,
        stayTime: item.stayTime,
        checked: false,
      }));

      try {
        const response = await getPlaceRouteEdit({
          planList: { [period]: periodData },
          transport: transport,
        });

        updatedData[period] = response[period];
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(false);

    setPlanConfirmList({
      periodPlan: updatedData,
      transport: transport,
      info: info,
    });

    navigation.navigate("PlanConfirmScreen");
  };

  // 여행지 박스에서 리스트에 추가
  const listPlaceAdd = (place: PlaceData) => {
    updatePlanList([
      ...planList,
      {
        item: place,
        nextLat: 0,
        nextLng: 0,
        nextPlaceGoogleId: "",
        nextPlaceId: 0,
        nextPlaceName: "",
        nextTime: "",
        stayTime: "1시간 0분",
      },
    ]);
  };

  // 여행지 박스에서 아이템 삭제
  const placeBoxRemove = (index: number) => {
    const items = Array.from(planPlaceBox);
    items.splice(index, 1);
    setPlanPlaceBox(items);
  };

  // 여행 리스트에서 아이템 삭제
  const itemRemove = (index: number) => {
    index = index - 1;
    const items = Array.from(planList);
    items.splice(index, 1);

    updatePlanList(items);
  };

  return {
    currentPeriod,
    planPlaceBox,
    setPlanPlaceBox,
    modalVisible,
    setModalVisible,
    planList,
    updatePlanList,
    onNext,
    listPlaceAdd,
    placeBoxRemove,
    setPlanList,
    itemRemove,
    isLoading,
  };
};
