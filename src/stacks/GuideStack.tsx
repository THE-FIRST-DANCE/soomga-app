/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

/* pages */
import { GuideType } from "@/data/guides";
import { TagType } from "@/data/tags";

import GuideRegionTagSelect from "@/Screens/GuideScreen/GuideRegionTagSelect";
import GuideListScreen from "@/Screens/GuideScreen/GuideListScreen";
import GuideDetailScreen from "@/Screens/GuideScreen/GuideDetailScreen";

export type GuideStackParamList = {
  GuideRegionTagSelect: undefined;
  GuideListScreen: {
    guidesInSelectedRegions: GuideType[];
    userTags: TagType[];
    isRecommended: boolean;
  };
  GuideDetailScreen: {
    guide: GuideType;
    userTags: TagType[];
  };
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
      <Stack.Screen
        name="GuideDetailScreen"
        component={GuideDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
