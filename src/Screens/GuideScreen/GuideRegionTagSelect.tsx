import Screen from "@/components/Screen";
import RegionSelect from "@/components/guide/RegionSelect";
import TagSettings from "@/components/guide/TagSettings";
import MatchingButton from "@/components/guide/MatchingButton";
import { View } from "react-native";

function GuideRegionTagSelect() {
  return (
    <Screen title="가이드 매칭">
      <RegionSelect />
      <TagSettings />
      <View style={{ alignItems: "flex-end", padding: 25 }}>
        <MatchingButton />
      </View>
    </Screen>
  );
}

export default GuideRegionTagSelect;
