/* Stack Navigator */
import MatchingPage from "@/Screens/GuideScreen/MatchingScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type GuideStackParamList = {
  MatchingScreen: undefined;
};

const Stack = createStackNavigator();

export default function GuideStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MatchingScreen" component={MatchingPage} />
    </Stack.Navigator>
  );
}
