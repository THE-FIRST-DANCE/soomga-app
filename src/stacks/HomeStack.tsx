import GuideRegionTagSelect from "@/Screens/GuideScreen/GuideRegionTagSelect";
import Main from "@/Screens/MainScreen/Main";
import Schedules from "@/Screens/ProfileScreen/Schedules";
import TagEdit from "@/Screens/ProfileScreen/TagEdit";

export type HomeStackParamList = {
  TagEditScreen: undefined;
  ScheduleScreen: undefined;
  GuideRegionTagSelect: undefined;
};

/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

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
        name="GuideRegionTagSelect"
        component={GuideRegionTagSelect}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
