import { View } from "react-native";
import { useEffect, useState } from "react";

/* components */
import Screen from "@/components/Screen";
import RegionSelect from "@/components/guide/RegionSelect";
import TagSettings from "@/components/guide/TagSettings";
import MatchingButton from "@/components/guide/MatchingButton";
import GuideModal from "@/components/guide/GuideModal";

/* data */
import { GuideType } from "@/data/guides";
import { tags, TagType } from "@/data/tags";

function GuideRegionTagSelect() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [guidesInSelectedRegions, setGuidesInSelectedRegions] = useState<
    GuideType[]
  >([]);
  const [userTags, setUserTags] = useState<TagType[]>([]);

  useEffect(() => {
    setUserTags(tags);
  });

  return (
    <Screen title="가이드 매칭">
      <RegionSelect setGuidesInSelectedRegions={setGuidesInSelectedRegions} />
      <TagSettings />
      <View style={{ alignItems: "flex-end", padding: 25 }}>
        <MatchingButton
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>
      {isModalVisible && (
        <GuideModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          guidesInSelectedRegions={guidesInSelectedRegions}
          userTags={userTags}
        />
      )}
    </Screen>
  );
}

export default GuideRegionTagSelect;
