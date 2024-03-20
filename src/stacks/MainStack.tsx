import { createStackNavigator } from "@react-navigation/stack";
import ScheduleStack from "./ScheduleStack";
import MainTabs from "@/tabs/MainTabs";

export type MainStackParamList = {
  MainTabs: undefined;
  ScheduleStack: undefined;
  PlanStack: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ScheduleStack" component={ScheduleStack} />
    </Stack.Navigator>
  );
}
