/* Pages */
import Main from "@main/Main";
import Plan from "@components/Plan";
import Sos from "@components/Sos";
import Chat from "@components/Chat";
import Profile from "@profile/Profile";
import TagEdit from "@profile/TagEdit";
import Schedules from "@profile/Schedules";

/* 화면 전환 */
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/* vector-icons */
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import PlanStack from "@/stacks/PlanStack";

/* 하단 내비게이션 바 생성 */
const Tab = createBottomTabNavigator();

/* 컴포넌트 내 내비게이터 생성 */
const Stack = createStackNavigator();

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
          tabBarHideOnKeyboard: true,
        }}
        initialRouteName="Main"
      >
        <Tab.Screen
          name="홈"
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={40} color={color} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Home Page"
                component={Main}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="태그 편집" component={TagEdit} />
              <Stack.Screen name="여행 일정" component={Schedules} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        {/* 플랜 탭 */}
        <Tab.Screen
          name="플랜"
          component={PlanStack}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="paper-plane" size={33} color={color} />
            ),
          }}
        />
        {/* SOS 탭 */}
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
