import { View } from "react-native";
import { useState } from "react";

import Screen from "@/components/Screen";
import RegionSelect from "@/components/guide/RegionSelect";
import TagSettings from "@/components/guide/TagSettings";
import MatchingButton from "@/components/guide/MatchingButton";
import GuideModal from "@/components/guide/GuideModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";
import { guides } from "@/data/guides";

function GuideRegionTagSelect() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

  return (
    <Screen title="가이드 매칭">
      <RegionSelect />
      <TagSettings />
      <View style={{ alignItems: "flex-end", padding: 25 }}>
        <MatchingButton
          onPress={() => {
            setIsModalVisible(true);
            // navigation.navigate("GuideListScreen", { guides });
          }}
        />
      </View>
      {isModalVisible && <GuideModal isModalVisible={isModalVisible} />}
    </Screen>
  );
}

export default GuideRegionTagSelect;
