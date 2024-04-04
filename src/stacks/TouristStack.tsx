import TouristScreen from "@/Screens/TouristScreen/TouristScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type TouristStackParamList = {
  TouristScreen: undefined;
  TouristDetailScreen: {
    touristId: number;
  };
};

const Stack = createStackNavigator<TouristStackParamList>();

export default function TouristStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TouristScreen" component={TouristScreen} />
    </Stack.Navigator>
  );
}
