import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { ChatStackParamList } from "@/stacks/ChatStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Text,
  View,
  Animated,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Feather,
  MaterialIcons,
  AntDesign,
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const images = [
  {
    id: 1,
    uri: "https://cdn.pixabay.com/photo/2023/02/11/13/43/building-7782841_1280.jpg",
  },
  {
    id: 2,
    uri: "https://cdn.pixabay.com/photo/2016/01/19/14/25/pavilion-1148883_1280.jpg",
  },
  {
    id: 3,
    uri: "https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg",
  },
  {
    id: 4,
    uri: "https://cdn.pixabay.com/photo/2016/10/17/07/53/busan-night-scene-1747130_1280.jpg",
  },
  {
    id: 5,
    uri: "https://cdn.pixabay.com/photo/2021/10/09/07/37/maisan-provincial-park-6693310_1280.jpg",
  },
];

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

  return (
    <Screen
      title={guide.name}
      right={
        <Feather
          name="menu"
          size={27}
          color={Colors.BLACK}
          onPress={toggleSidebar}
          style={{ position: "absolute", right: 0, marginRight: 20 }}
        />
      }
    >
      <View style={{ flex: 1 }}>
        {/* 사이드바 */}
        {isSidebarOpen && (
          <Animated.View
            style={[
              styles.sidebar,
              {
                transform: [
                  {
                    translateX: slideAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [320, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={{ flex: 0.8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.caption}>플랜 리스트</Text>
                <Text style={{ fontSize: 13, color: "gray" }}>더보기</Text>
              </View>
              {[1, 2, 3].map((item, index) => (
                <View key={index} style={styles.sidebarPlan}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text>플랜 {item}</Text>
                    <Text style={{ fontSize: 10, marginLeft: 8 }}>
                      플랜 설명....
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MaterialIcons name="access-time" size={13} color="black" />
                    <Text style={styles.planTime}>n시간</Text>
                    <AntDesign
                      name="close"
                      size={15}
                      color="black"
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flex: 0.9 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.caption}>사진</Text>
                <Text style={{ fontSize: 13, color: "gray" }}>더보기</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {images.map((item, index) => (
                  <Image
                    source={{ uri: item.uri }}
                    key={item.id}
                    style={{ width: 60, height: 60, margin: 5 }}
                  />
                ))}
              </View>
            </View>
            <View style={{ flex: 0.7 }}>
              <Text style={styles.caption}>대화상대</Text>
              <View
                style={{
                  flex: 1,
                  height: 60,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: guide.photo }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
                >
                  {guide.name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="face-man"
                  size={40}
                  color="black"
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}
                >
                  나
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Ionicons
                name="exit-outline"
                size={35}
                color={Colors.GRAY_DARK}
              />
              <View style={{ flexDirection: "row" }}>
                {isStarred ? (
                  <FontAwesome
                    name="star"
                    size={24}
                    color={Colors.STAR_YELLOW}
                    style={{ marginHorizontal: 10 }}
                    onPress={() => setIsStarred(!isStarred)}
                  />
                ) : (
                  <FontAwesome
                    name="star-o"
                    size={24}
                    color="black"
                    style={{ marginHorizontal: 10 }}
                    onPress={() => setIsStarred(!isStarred)}
                  />
                )}
                <SimpleLineIcons
                  name="settings"
                  size={23}
                  color="black"
                  style={{ marginHorizontal: 10 }}
                />
              </View>
            </View>
          </Animated.View>
        )}

        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={() => isSidebarOpen && toggleSidebar()}
        >
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              flex: 0.09,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{ flex: 0.2, borderRadius: 100, alignItems: "center" }}
            >
              <Feather name="plus" size={24} color="black" />
            </View>
            <TextInput
              style={{
                backgroundColor: Colors.GRAY_MEDIUM,
                flex: 1,
                height: "100%",
                padding: 10,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 30 }}></Text>
            </TextInput>
            <View style={{ flex: 0.2, alignItems: "center" }}>
              <Feather name="send" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default ChatRoomScreen;

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: Colors.WHITE,
    width: 320,
    height: "100%",
    padding: 20,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sidebarPlan: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  planTime: {
    fontSize: 10,
    marginLeft: 5,
  },
});
