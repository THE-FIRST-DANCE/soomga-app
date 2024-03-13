/* Stack Navigator */
import GuideRegionTagSelect from "@/Screens/GuideScreen/GuideRegionTagSelect";
import { createStackNavigator } from "@react-navigation/stack";

export type GuideStackParamList = {
  GuideRegionTagSelect: undefined;
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
      />
    </Stack.Navigator>
  );
}
