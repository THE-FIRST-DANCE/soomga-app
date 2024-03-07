/* Pages */
import Profile from "@profile/Profile";
import EmailPassword from "@signIn/EmailPassword";
import NicknameGender from "@signIn/NicknameGender";
import TagsSelect from "@signIn/TagsSelect";

/* Stack Navigator */
import { createStackNavigator } from "@react-navigation/stack";

function ProfileStacks() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile Page"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Email & Password"
        component={EmailPassword}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Nickname & Gender"
        component={NicknameGender}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Tags Select"
        component={TagsSelect}
        options={{ headerTitle: "" }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStacks;
