import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { ChatStackParamList } from "@/stacks/ChatStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatRoomSidebar from "@/components/chat/ChatRoomSidebar";
import { MyMessage, OpponentMessage } from "@/components/chat/Message";

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

  const [text, setText] = useState<string>("");

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
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <OpponentMessage guide={guide} text={text} />
            <MyMessage text={text} />
          </View>
          <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={100}
            style={styles.inputSection}
          >
            <View style={styles.plus}>
              <Feather name="plus" size={24} color="black" />
            </View>
            <TextInput
              style={styles.textInput}
              onChangeText={(newText) => {
                setText(newText);
                console.log(newText);
              }}
            />
            <View style={styles.send}>
              <Feather
                name="send"
                size={24}
                color="black"
                onPress={() => setText("")}
              />
            </View>
          </KeyboardAvoidingView>
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
