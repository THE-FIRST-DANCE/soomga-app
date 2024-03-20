import Screen from "@/components/Screen";
import RegionSelect from "@/components/guide/RegionSelect";
import TagSettings from "@/components/guide/TagSettings";
import MatchingButton from "@/components/guide/MatchingButton";
import { View } from "react-native";
import { useState } from "react";
import GuideMatchingScreen from "../../components/guide/GuideMatchingModal";

function GuideRegionTagSelect() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <Screen title="가이드 매칭">
      <RegionSelect />
      <TagSettings />
      <View style={{ alignItems: "flex-end", padding: 25 }}>
        <MatchingButton
          onPress={() => {
            setIsModalVisible(true);
          }}
        />
      </View>
      {isModalVisible && (
        <GuideMatchingScreen
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </Screen>
  );
}

export default GuideRegionTagSelect;
