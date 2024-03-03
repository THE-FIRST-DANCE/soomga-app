import PlanCreateDetail from "@/Screens/PlanCreateScreen/PlanCreateDetail";
import PlanCreateScreen from "@/Screens/PlanCreateScreen/PlanCreateScreen";
import PlaceSelectScreen from "@/Screens/PlanPlaceSelectScreen/PlaceSelectScreen";
import PlanPlaceSelectScreen from "@/Screens/PlanPlaceSelectScreen/PlanPlaceSelectScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type PlanStackParamList = {
  PlanCreateScreen: undefined;
  PlanCreateDetail: undefined;
  PlanPlaceSelectScreen: undefined;
  PlaceSelectScreen: undefined;
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
    </Stack.Navigator>
  );
}
