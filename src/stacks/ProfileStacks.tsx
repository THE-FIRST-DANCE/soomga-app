/* Pages */
import Profile from "@/components/profile/Profile";
import EmailPassword from "@/components/profile/SignIn/EmailPassword";
import NicknameGender from "@/components/profile/SignIn/NicknameGender";
import TagsSelect from "@/components/profile/SignIn/TagsSelect";

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Nickname & Gender"
        component={NicknameGender}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tags Select"
        component={TagsSelect}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStacks;
