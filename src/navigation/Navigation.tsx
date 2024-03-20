/* 화면 전환 */
import { NavigationContainer } from "@react-navigation/native";

import MainStack from "@/stacks/MainStack";

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
