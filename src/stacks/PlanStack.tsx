import PlanCreateDetail from "@/Screens/PlanCreateScreen/PlanCreateDetail";
import PlanCreateScreen from "@/Screens/PlanCreateScreen/PlanCreateScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type PlanStackParamList = {
  PlanCreateScreen: undefined;
  PlanCreateDetail: undefined;
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
    </Stack.Navigator>
  );
}
