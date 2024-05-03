import PlanConfirmScreen from "@/Screens/PlanScreen/PlanConfirmScreen";
import PlanEditScreen from "@/Screens/PlanScreen/PlanEditScreen";
import PlanCreateDetail from "@/Screens/PlanScreen/PlanCreateDetail";
import PlanCreateScreen from "@/Screens/PlanScreen/PlanCreateScreen";
import PlaceSelectScreen from "@/Screens/PlanScreen/PlaceSelectScreen";
import PlanPlaceSelectScreen from "@/Screens/PlanScreen/PlanPlaceSelectScreen";
import { PlanConfirmPeriodList, Plans } from "@/interface/Plan";
import { PlanInfo } from "@/state/store/PlanRecoil";
import { createStackNavigator } from "@react-navigation/stack";

export type PlanStackParamList = {
  PlanCreateScreen: undefined;
  PlanCreateDetail: undefined;
  PlanPlaceSelectScreen: undefined;
  PlaceSelectScreen: {
    editMode?: boolean;
  };
  PlanConfirmScreen: {
    data?: Plans;
  };
  PlanEditScreen: {
    data: PlanConfirmPeriodList;
    info: PlanInfo;
    transport: string;
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
    </Stack.Navigator>
  );
}
