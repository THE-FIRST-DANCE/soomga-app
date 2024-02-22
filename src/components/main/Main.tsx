import { ScrollView, View } from "react-native";

/* Pages */
import Search from "@main/Search";
import Tags from "@main/Tags";
import Schedules from "@scheduleMain/Schedules";
import Recommend from "@recommendMain/Recommend";
import Guides from "@guideMain/Guides";

function Main() {
  return (
    <View>
      <Search />
      <Tags />
      <ScrollView style={{ height: 580 }} showsVerticalScrollIndicator={false}>
        <Schedules />
        <Recommend />
        <Guides />
      </ScrollView>
    </View>
  );
}

export default Main;
