/* Pages */
import Main from "../Main";
import Plan from "../Plan";
import Sos from "../Sos";
import Chat from "../Chat";
import Profile from "../Profile";

/* 화면 전환 */
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* vector-icons */
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

/* 하단 내비게이션 바 생성 */
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#DC2626",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: tabBarStyle,
          tabBarLabelStyle: tabBarLabelStyle,
        }}
        initialRouteName="Main"
      >
        <Tab.Screen
          name="홈"
          component={Main}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={40} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="플랜"
          component={Plan}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="paper-plane" size={33} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SOS"
          component={Sos}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="warning" size={35} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="채팅"
          component={Chat}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="chat" size={35} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="프로필"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="user-large" size={30} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* 하단 내비게이션 바 스타일 */
const tabBarStyle = {
  height: 80,
};

/* 하단 내비게이션 바 라벨 스타일 */
const tabBarLabelStyle = {
  fontSize: 15,
  marginVertical: 2,
};
