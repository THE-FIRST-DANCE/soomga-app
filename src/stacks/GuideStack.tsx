/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

/* pages */
import GuideMatchingScreen from "@/Screens/GuideScreen/GuideMatchingScreen";
import GuideRegionTagSelect from "@/Screens/GuideScreen/GuideRegionTagSelect";

export type GuideStackParamList = {
  GuideRegionTagSelect: undefined;
  GuideMatchingScreen: undefined;
};

const Stack = createStackNavigator();

export default function GuideStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="GuideRegionTagSelect"
        component={GuideRegionTagSelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuideMatchingScreen"
        component={GuideMatchingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
