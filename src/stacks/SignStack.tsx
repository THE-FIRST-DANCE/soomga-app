import { GuideReview } from "@/components/guide/GuideDetailReview";
import GuideRegisterScreen from "@/Screens/ProfileScreen/GuideRegisterScreen";
import LangSettingScreen from "@/Screens/ProfileScreen/LangSettingScreen";
import MyPlacesScreen from "@/Screens/ProfileScreen/MyPlacesScreen";
import MyPlansScreen from "@/Screens/ProfileScreen/MyPlansScreen";
import MyReviewsScreen from "@/Screens/ProfileScreen/MyReviewsScreen";
import ProfileModify from "@/Screens/ProfileScreen/ProfileModify";
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
  GuideRegisterScreen: undefined;
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
      <Stack.Screen name="MyPlansScreen" component={MyPlansScreen} />
      <Stack.Screen name="MyPlacesScreen" component={MyPlacesScreen} />
      <Stack.Screen name="LangSettingScreen" component={LangSettingScreen} />
      <Stack.Screen name="ProfileModifyScreen" component={ProfileModify} />
      <Stack.Screen
        name="GuideRegisterScreen"
        component={GuideRegisterScreen}
      />
    </Stack.Navigator>
  );
}
