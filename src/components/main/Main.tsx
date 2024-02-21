import { View } from "react-native";

/* 페이지 import */
import Search from "./Search";
import Tags from "./Tags";
import Schedules from "./Schedule/Schedules";
import Recommend from "./Recommend/Recommend";

function Main() {
  return (
    <View>
      <Search />
      <Tags />
      <Schedules />
      <Recommend />
    </View>
  );
}

export default Main;
