import TouristCommentEditScreen from "@/Screens/TouristScreen/TouristCommentEditScreen";
import TouristDetailCommentsScreen from "@/Screens/TouristScreen/TouristDetailCommentsScreen";
import TouristDetailScreen from "@/Screens/TouristScreen/TouristDetailScreen";
import TouristScreen from "@/Screens/TouristScreen/TouristScreen";
import { SosCommentType } from "@/interface/Sos";
import { createStackNavigator } from "@react-navigation/stack";

export type TouristStackParamList = {
  TouristScreen: undefined;
  TouristDetailScreen: {
    touristId: number;
  };
  TouristDetailCommentsScreen: {
    comments: SosCommentType[] | undefined;
    touristId: number;
  };
  TouristCommentEditScreen: {
    comment: string;
    commentId: number;
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
      <Stack.Screen
        name="TouristDetailScreen"
        component={TouristDetailScreen}
      />
      <Stack.Screen
        name="TouristDetailCommentsScreen"
        component={TouristDetailCommentsScreen}
      />
      <Stack.Screen
        name="TouristCommentEditScreen"
        component={TouristCommentEditScreen}
      />
    </Stack.Navigator>
  );
}
