import Main from "@/Screens/MainScreen/Main";
import Schedules from "@/Screens/ProfileScreen/Schedules";
import TagEdit from "@/Screens/ProfileScreen/TagEdit";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home Page"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="태그 편집" component={TagEdit} />
      <Stack.Screen name="여행 일정" component={Schedules} />
    </Stack.Navigator>
  );
}

export default HomeStack;
