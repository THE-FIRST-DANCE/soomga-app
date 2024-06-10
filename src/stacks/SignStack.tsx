import SignInScreen from "@/Screens/SignScreen/SignInScreen";
import SignUpScreen from "@/Screens/SignScreen/SignUpScreen";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

export type SignStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
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
    </Stack.Navigator>
  );
}
