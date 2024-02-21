import { View } from "react-native";

/* Pages */
import Search from "@main/Search";
import Tags from "@main/Tags";
import Schedules from "@schedule/Schedules";
import Recommend from "@recommend/Recommend";

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
