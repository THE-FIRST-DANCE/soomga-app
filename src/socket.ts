import { io } from "socket.io-client";
import { GLOBAL_CONFIG } from "./global.config";
import * as SecureStore from "expo-secure-store";

export const socket = io(GLOBAL_CONFIG.VITE_APP_SOCKET_URL, {
  autoConnect: true,
  auth: {
    accessToken: SecureStore.getItem("accessToken"),
  },
});
