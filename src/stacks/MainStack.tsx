import { createStackNavigator } from "@react-navigation/stack";
import ScheduleStack from "./ScheduleStack";
import MainTabs from "@/tabs/MainTabs";
import SosStack from "./SosStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import TouristStack from "./TouristStack";
import React from "react";

export type MainStackParamList = {
  MainTabs: undefined;
  ScheduleStack: undefined;
  PlanStack: undefined;
  SosStack: {
    cursor?: number;
  };
  TouristStack: undefined;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
  const navigation = useNavigation<NavigationProp<MainStackParamList>>();

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { screen } = response.notification.request.content.data;

        if (screen === "Sos") {
          navigation.navigate("SosStack", {
            cursor: response.notification.request.content.data.cursor,
          });
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="ScheduleStack" component={ScheduleStack} />
      <Stack.Screen name="SosStack" component={SosStack} />
      <Stack.Screen name="TouristStack" component={TouristStack} />
    </Stack.Navigator>
  );
}
