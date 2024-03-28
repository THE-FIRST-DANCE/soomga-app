import ScheduleCreateScreen from "@/Screens/ScheduleScreen/ScheduleCreateScreen";
import ScheduleDetailScreen from "@/Screens/ScheduleScreen/ScheduleDetailScreen";
import ScheduleScreen from "@/Screens/ScheduleScreen/ScheduleScreen";
import { EventData } from "@/interface/Event";
import { createStackNavigator } from "@react-navigation/stack";

export type ScheduleStackParamList = {
  ScheduleScreen: undefined;
  ScheduleCreateScreen: {
    date: string;
    editEvent?: EventData;
  };
  ScheduleDetailScreen: {
    event: EventData;
  };
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
      <Stack.Screen
        name="ScheduleCreateScreen"
        component={ScheduleCreateScreen}
      />
      <Stack.Screen
        name="ScheduleDetailScreen"
        component={ScheduleDetailScreen}
      />
    </Stack.Navigator>
  );
}
