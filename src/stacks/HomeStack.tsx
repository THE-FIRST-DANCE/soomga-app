export type HomeStackParamList = {
  TagEditScreen: undefined;
  ScheduleScreen: undefined;
  GuideStack: undefined;
};

import Main from "@/components/main/Main";
import TagEdit from "@/components/profile/TagEdit";
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
    </Stack.Navigator>
  );
}
