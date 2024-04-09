import ChatRoomScreen from "@/Screens/ChatScreen/ChatRoomScreen";
import { createStackNavigator } from "@react-navigation/stack";

export type ChatStackParamList = {
  ChatListScreen: undefined;
};

const Stack = createStackNavigator<ChatStackParamList>();

function ChatStack() {
  /* user: 로그인한 유저 정보, processingSignIn: 로그인 중인지 여부, processingSignUp: 회원가입 중인지 여부, initialized:  */
  // const { user, processingSignIn, processingSignUp, initialized }

  /* 로그인 여부에 따라 다른 화면 렌더링 */
  // const renderRootStack = useCallback(() => {
  //   if(!initialized) {
  //     return (
  //       <Stack.Screen name="Loading" component={LoadingScreen} />
  //    )
  //   }
  //   if(user != null && processingSignIn == true && processingSignUp == true) {
  //     return (
  //       <Stack.Screen name="ChatListScreen" component={ChatRoomScreen} />
  //     )
  //   }

  //   return(
  //     <Stack.Screen name="ChatListScreen" component={ChatRoomScreen} />
  //   )
  // }, [user, processingSignIn, processingSignUp, initialized]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default ChatStack;
