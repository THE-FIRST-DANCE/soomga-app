import { createStackNavigator } from "@react-navigation/stack";

import PlanConfirmScreen from "@/Screens/PlanScreen/PlanConfirmScreen";
import PlanEditScreen from "@/Screens/PlanScreen/PlanEditScreen";
import PlanCreateDetail from "@/Screens/PlanScreen/PlanCreateDetail";
import PlanCreateScreen from "@/Screens/PlanScreen/PlanCreateScreen";
import PlaceSelectScreen from "@/Screens/PlanScreen/PlaceSelectScreen";
import PlanPlaceSelectScreen from "@/Screens/PlanScreen/PlanPlaceSelectScreen";
import PlanDetailScreen from "@/Screens/PlanScreen/PlanDetailScreen";
import PlanExecuteScreen from "@/Screens/PlanScreen/PlanExecuteScreen";

import { PlanConfirmPeriodList, Plans } from "@/interface/Plan";
import { PlanInfo } from "@/state/store/PlanRecoil";

export type PlanStackParamList = {
  PlanCreateScreen: undefined;
  PlanCreateDetail: undefined;
  PlanPlaceSelectScreen: undefined;
  PlaceSelectScreen: {
    editMode?: boolean;
  };
  PlanConfirmScreen: {
    planId?: number;
  };
  PlanEditScreen: {
    data: PlanConfirmPeriodList;
    info: PlanInfo;
    transport: string;
  };
  PlanDetailScreen: {
    planId: number;
  };
  PlanExecuteScreen: {
    executePlanId: number;
    planId: number;
  };
};

const Stack = createStackNavigator<PlanStackParamList>();

export default function PlanStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PlanCreateScreen" component={PlanCreateScreen} />
      <Stack.Screen name="PlanCreateDetail" component={PlanCreateDetail} />
      <Stack.Screen
        name="PlanPlaceSelectScreen"
        component={PlanPlaceSelectScreen}
      ></Stack.Screen>
      <Stack.Screen name="PlaceSelectScreen" component={PlaceSelectScreen} />
      <Stack.Screen name="PlanConfirmScreen" component={PlanConfirmScreen} />
      <Stack.Screen name="PlanEditScreen" component={PlanEditScreen} />
      <Stack.Screen name="PlanDetailScreen" component={PlanDetailScreen} />
      <Stack.Screen name="PlanExecuteScreen" component={PlanExecuteScreen} />
    </Stack.Navigator>
  );
}
