import { useState } from "react";

/* Navigation */
import { NavigationProp, useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { HomeStackParamList } from "@/stacks/HomeStack";

import { tags } from "@/data/tags";

/* props */
type TagType = {
  id: number;
  name: string;
};

function Tags() {
  const lastIndex = tags.length;

  /* 전체 태그 상태 관리 */
  const [allTags, setAllTags] = useState<TagType[]>([
    ...tags,
    { id: lastIndex + 1, name: "..." },
  ]);

  /* navigation 추가 */
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {allTags.map((tag, index) => (
        <Pressable
          key={tag.id}
          style={styles.tag}
          onPress={() => {
            if (index === allTags.length - 1) {
              navigation.navigate("TagEditScreen");
            }
          }}
        >
          <Text>{tag.name}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  /* 태그 컨테이너 스타일 */
  container: {
    flexDirection: "row",
    width: screenWidth - 20,
    height: 50,
    marginHorizontal: 10,
    marginTop: 10,
  },
  /* 각 태그 스타일 */
  tag: {
    borderColor: "#DC2626",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 3,
    padding: 7,
    height: 35,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default Tags;
