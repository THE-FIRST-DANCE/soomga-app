import SosCreateScreen from "@/Screens/SosScreen/SosCreateScreen";
import SosMapScreen from "@/Screens/SosScreen/SosMapScreen";
import SosScreen from "@/Screens/SosScreen/SosScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type SosStackParamList = {
  SosScreen: undefined;
  SosCreateScreen: undefined;
  SosMapScreen: undefined;
};

const Stack = createStackNavigator<SosStackParamList>();

export default function SosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SosScreen" component={SosScreen} />
      <Stack.Screen name="SosCreateScreen" component={SosCreateScreen} />
      <Stack.Screen name="SosMapScreen" component={SosMapScreen} />
    </Stack.Navigator>
  );
}
