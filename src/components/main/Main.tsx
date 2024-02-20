import { View } from "react-native";

/* 페이지 import */
import Search from "./Search";
import Tags from "./Tags";
import Schedules from "./Schedules";

function Main() {
  return (
    <View>
      <Search />
      <Tags />
      <Schedules />
    </View>
  );
}

export default Main;
