// Librairies
import { useEffect } from "react";
import { Platform } from "react-native";

import { RecoilRoot, useSetRecoilState } from "recoil";
import Navigation from "./src/navigation/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { LoadUserData } from "@/components/loaders/LoadUserData";
import { UserLoader } from "@/components/loaders/UserLoader";
import { LoadExecutePlan } from "@/components/loaders/LoadExecutePlan";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <UserLoader />
        <LoadUserData />
        <LoadExecutePlan />
        <Navigation />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
