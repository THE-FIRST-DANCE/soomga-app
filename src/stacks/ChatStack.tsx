import { GuideType } from "@/data/guides";
import { Member } from "@/interface/Chat";
import ChatListScreen from "@/Screens/ChatScreen/ChatListScreen";
import ChatRoomScreen from "@/Screens/ChatScreen/ChatRoomScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type ChatStackParamList = {
  ChatListScreen: undefined;
  ChatRoomScreen: {
    opponent?: Member | null;
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
