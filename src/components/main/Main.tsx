import { View } from "react-native";

/* 페이지 import */
import Search from "./Search";
import Tags from "./Tags";
import Schedules from "./Schedules";
import Recommend from "./recommend/Recommend";

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
