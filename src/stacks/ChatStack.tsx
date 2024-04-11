import { GuideType } from "@/data/guides";
import ChatListScreen from "@/Screens/ChatScreen/ChatListScreen";
import ChatRoomScreen from "@/Screens/ChatScreen/ChatRoomScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type ChatStackParamList = {
  ChatListScreen: undefined;
  ChatRoomScreen: {
    guide: GuideType;
  };
};

const Stack = createStackNavigator<ChatStackParamList>();

function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
      <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default ChatStack;
