import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { ChatStackParamList } from "@/stacks/ChatStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import ChatRoomSidebar from "@/components/chat/ChatRoomSidebar";
import {
  Message,
  MyMessage,
  OpponentMessage,
  ServiceMessage,
} from "@/components/chat/Message";
import Multimedia from "@/components/chat/Multimedia";
import { useChat } from "@/hooks/chat/useChat";
import { useRecoilState } from "recoil";
import { AccessTokenAtom } from "@/state/store/AccessTokenAtom";

export interface MessageProp {
  id: number;
  isMine: boolean;
  content: string;
  created_at: Date;
}

function ChatRoomScreen() {
  const route = useRoute<RouteProp<ChatStackParamList, "ChatRoomScreen">>();
  const { room, opponent } = route.params;
  const [recoilToken, setRecoilToken] = useRecoilState(AccessTokenAtom);

  /* 사이드바 open 여부 */
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  /* 사이드바 애니메이션 */
  const [slideAnimation] = useState<Animated.Value>(new Animated.Value(0));

  /* 사이드바 - 채팅방 즐겨찾기 여부 */
  const [isStarred, setIsStarred] = useState<boolean>(false);

  /* 사이드바 애니메이션 실행 함수 */
  const toggleSidebar = () => {
    /* 사이드바 open / close 여부 */
    const toValue = !isSidebarOpen ? 1 : 0;

    if (isSidebarOpen) {
      Animated.timing(slideAnimation, {
        toValue: toValue,
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        setIsSidebarOpen(!isSidebarOpen); // 애니메이션이 끝나면 사이드바 상태를 업데이트한다.
      });
    } else {
      // 사이드바가 닫혀있다면 애니메이션을 열고 시작한다.
      setIsSidebarOpen(!isSidebarOpen); // 애니메이션을 시작하기 전에 사이드바 상태를 업데이트한다.
      Animated.timing(slideAnimation, {
        toValue: toValue,
        duration: 320,
        useNativeDriver: true,
      }).start();
    }
  };

  /* 키보드 표시 여부 */
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  /* 멀티미디어 표시 여부 */
  const [isOpenMultimedia, setIsOpenMultimedia] = useState<boolean>(false);

  const rotateAnimation = useState(new Animated.Value(0))[0];

  /* 키보드/멀티미디어 중 하나만 표시하게 함 */
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  /* 멀티미디어 표시 */
  const toggleMultimedia = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    }
    setIsOpenMultimedia(!isOpenMultimedia);
  };

  /* 멀티미디어 표시 버튼 토글 함수 */
  const toggleRotation = () => {
    setIsOpenMultimedia(!isOpenMultimedia);

    Animated.timing(rotateAnimation, {
      toValue: !isOpenMultimedia ? 1 : 0, // 현재 상태 반전
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotation = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const { isConnected, messages, sendMessage, fetchMessages } = useChat(
    room?.id
  );

  useEffect(() => {
    console.log("메시지:", messages);
  }, [messages]);

  const [text, setText] = useState<string>("");

  const handleSend = () => {
    if (text) {
      sendMessage({ message: text }, recoilToken.name);
      setText("");
    }
  };

  return (
    <Screen
      title={opponent?.member.nickname}
      right={
        <Feather
          name="menu"
          size={27}
          color={Colors.BLACK}
          onPress={toggleSidebar}
          style={styles.menuButton}
        />
      }
    >
      <View style={{ flex: 1 }}>
        {/* {isSidebarOpen && (
          <ChatRoomSidebar
            slideAnimation={slideAnimation}
            guide={guide}
            isStarred={isStarred}
            setIsStarred={setIsStarred}
          />
        )} */}
        <Pressable
          style={{ flex: 1, justifyContent: "flex-end" }}
          onPress={() => isSidebarOpen && toggleSidebar()}
        >
          <FlatList
            inverted
            data={messages}
            renderItem={({ item: message }) => (
              <Message
                isMine={message.sender.id !== opponent?.member.id}
                content={message.content.message}
              />
            )}
          />
        </Pressable>
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={100}
          style={styles.inputSection}
        >
          <Animated.View
            style={[styles.plus, { transform: [{ rotate: rotation }] }]}
          >
            <Entypo
              name="plus"
              size={28}
              color={Colors.WHITE}
              onPress={() => {
                toggleRotation();
                toggleMultimedia();
              }}
              style={{
                padding: 5,
                borderRadius: 100,
                alignSelf: "center",
                backgroundColor: Colors.BLUE,
              }}
            />
          </Animated.View>
          <TextInput
            style={styles.textInput}
            onChangeText={(newText) => {
              setText(newText);
            }}
            onPressIn={() => {
              if (isOpenMultimedia) toggleRotation();
            }}
            value={text}
          />
          <View style={styles.send}>
            <Feather
              name="send"
              size={24}
              color={Colors.WHITE}
              onPress={handleSend}
              style={{
                padding: 8,
                borderRadius: 100,
                alignSelf: "center",
                backgroundColor: Colors.BASKETBALL_ORANGE,
              }}
            />
          </View>
        </KeyboardAvoidingView>
        {isOpenMultimedia && <Multimedia />}
      </View>
    </Screen>
  );
}

export default ChatRoomScreen;

const styles = StyleSheet.create({
  menuButton: { position: "absolute", right: 0, marginRight: 20 },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingVertical: 10,
  },
  plus: { flex: 0.2, borderRadius: 100, alignItems: "center" },
  textInput: {
    backgroundColor: Colors.GRAY_MEDIUM,
    flex: 1,
    height: "100%",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
  },
  send: { flex: 0.2, alignItems: "center" },
});
