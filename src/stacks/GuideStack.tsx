/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

/* pages */
import { GuideType } from "@/data/guides";
import GuideRegionTagSelect from "@/Screens/GuideScreen/GuideRegionTagSelect";
import GuideListScreen from "@/Screens/GuideScreen/GuideListScreen";

export type GuideStackParamList = {
  GuideRegionTagSelect: undefined;
  GuideListScreen: undefined;
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
        name="GuideListScreen"
        component={GuideListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
