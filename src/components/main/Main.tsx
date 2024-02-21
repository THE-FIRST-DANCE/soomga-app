import { ScrollView, View } from "react-native";

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
      <ScrollView style={{ height: 580 }} showsVerticalScrollIndicator={false}>
        <Schedules />
        <Recommend />
        <Recommend />
      </ScrollView>
    </View>
  );
}

export default Main;
