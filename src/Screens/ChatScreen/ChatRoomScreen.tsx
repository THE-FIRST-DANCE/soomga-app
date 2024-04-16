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
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import ChatRoomSidebar from "@/components/chat/ChatRoomSidebar";
import { MyMessage, OpponentMessage } from "@/components/chat/Message";
import Multimedia from "@/components/chat/Multimedia";

export interface MessageProp {
  id: number;
  isMine: boolean;
  content: string;
  created_at: Date;
}

function ChatRoomScreen() {
  const route = useRoute<RouteProp<ChatStackParamList, "ChatRoomScreen">>();
  const { guide } = route.params;

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

  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<MessageProp[]>([
    { id: 1, isMine: false, content: "반가워요!", created_at: new Date() },
    {
      id: 2,
      isMine: false,
      content: "꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다",
      created_at: new Date(),
    },
  ]);

  const isSameSender = (index: number) => {
    return messages[index - 1]?.isMine === messages[index]?.isMine;
  };

  const handleSend = () => {
    if (text) {
      const newMessage = {
        id: messages.length + 1,
        isMine: true,
        content: text,
        created_at: new Date(),
      };
      setMessages([...messages, newMessage]);
      setText("");
    }
  };

  return (
    <Screen
      title={guide.name}
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
        {isSidebarOpen && (
          <ChatRoomSidebar
            slideAnimation={slideAnimation}
            guide={guide}
            isStarred={isStarred}
            setIsStarred={setIsStarred}
          />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={() => isSidebarOpen && toggleSidebar()}
        >
          <ScrollView
            contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
          >
            {messages.map((message, index) =>
              message.isMine ? (
                <MyMessage
                  key={index}
                  message={message}
                  isSameSender={isSameSender(index)}
                />
              ) : (
                <OpponentMessage
                  key={index}
                  guide={guide}
                  message={message}
                  isSameSender={isSameSender(index)}
                />
              )
            )}
            <OpponentMessage
              guide={guide}
              message={{
                id: 100,
                isMine: false,
                content: "꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다",
                created_at: new Date(),
              }}
              isSameSender={false}
            />
            <OpponentMessage
              guide={guide}
              message={{
                id: 100,
                isMine: false,
                content: "꽁꽁 얼어붙은 한강 위로 고양이가 걸어다닙니다",
                created_at: new Date(),
              }}
              isSameSender={true}
            />
          </ScrollView>
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
                  padding: 8,
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
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default ChatRoomScreen;

const styles = StyleSheet.create({
  menuButton: { position: "absolute", right: 0, marginRight: 20 },
  inputSection: {
    flex: 0.09,
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
