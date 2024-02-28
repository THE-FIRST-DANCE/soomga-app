/* Pages */
import Main from "@main/Main";
import TagEdit from "@profile/TagEdit";
import Schedules from "@profile/Schedules";

/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

function HomeStacks() {
  const Stack = createStackNavigator();

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

export default HomeStacks;
