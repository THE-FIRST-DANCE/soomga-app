import ScheduleScreen from "@/Screens/ScheduleScreen/ScheduleScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type ScheduleStackParamList = {
  ScheduleScreen: undefined;
};

const Stack = createStackNavigator<ScheduleStackParamList>();

export default function ScheduleStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    </Stack.Navigator>
  );
}
