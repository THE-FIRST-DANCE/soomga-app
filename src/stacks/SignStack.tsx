import { GuideReview } from "@/components/guide/GuideDetailReview";
import MyReviewsScreen from "@/Screens/ProfileScreen/MyReviewsScreen";
import SignInScreen from "@/Screens/SignScreen/SignInScreen";
import SignUpScreen from "@/Screens/SignScreen/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type SignStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  MyReviewsScreen: undefined;
  MyPlansScreen: undefined;
  MyPlacesScreen: undefined;
  ProfileModifyScreen: undefined;
  GuideApplicationScreen: undefined;
  LangSettingScreen: undefined;
};

const Stack = createStackNavigator<SignStackParamList>();

export default function SignStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="MyReviewsScreen" component={MyReviewsScreen} />
    </Stack.Navigator>
  );
}
