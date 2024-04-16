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
  Pressable,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
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

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [slideAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [isStarred, setIsStarred] = useState<boolean>(false);

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

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [isOpenMultimedia, setIsOpenMultimedia] = useState<boolean>(false);
  const rotateAnimation = useState(new Animated.Value(0))[0];

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
  const [messages, setMessages] = useState<MessageProp[]>([]);

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
            <OpponentMessage guide={guide} text="" />
            {messages.map((message, index) => (
              <MyMessage key={index} message={message} />
            ))}
          </ScrollView>
          <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={100}
            style={styles.inputSection}
          >
            <Animated.View
              style={[styles.plus, { transform: [{ rotate: rotation }] }]}
            >
              <Feather
                name="plus"
                size={24}
                color="black"
                onPress={() => {
                  toggleRotation();
                  toggleMultimedia();
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
            />
            <View style={styles.send}>
              <Feather
                name="send"
                size={24}
                color="black"
                onPress={handleSend}
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
  },
  plus: { flex: 0.2, borderRadius: 100, alignItems: "center" },
  textInput: {
    backgroundColor: Colors.GRAY_MEDIUM,
    flex: 1,
    height: "100%",
    padding: 10,
    justifyContent: "center",
  },
  send: { flex: 0.2, alignItems: "center" },
});
