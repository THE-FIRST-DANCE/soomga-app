import Main from "@/Screens/MainScreen/Main";
import Schedules from "@/Screens/ProfileScreen/Schedules";
import TagEdit from "@/Screens/ProfileScreen/TagEdit";

/* Stack Navigator */
import GuideStack from "./GuideStack";
/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

export type HomeStackParamList = {
  TagEditScreen: undefined;
  ScheduleScreen: undefined;
  GuideStack: undefined;
};

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Page"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="TagEditScreen" component={TagEdit} />
      <Stack.Screen name="ScheduleScreen" component={Schedules} />
      <Stack.Screen
        name="GuideStack"
        component={GuideStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
