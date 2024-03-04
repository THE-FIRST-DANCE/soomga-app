import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { useState } from "react";

/* Navigation */
import { useNavigation } from "@react-navigation/native";
import {
  MyNavigationProp,
  RootStackParamList,
} from "@navigation/NavigationProps";

/* components */
import Tag, { TagType } from "@main/Tag";

function Tags() {
  /* 임시 데이터 */
  const tags = [
    { id: 1, name: "#ISFJ" },
    { id: 2, name: "#Kpop" },
    { id: 3, name: "#인스타그램" },
    { id: 4, name: "#사진" },
    { id: 5, name: "#야구" },
    { id: 6, name: "#볼링" },
    { id: 7, name: "#프로그래밍" },
  ];

  const lastIndex = tags.length;

  /* 전체 태그 상태 관리 */
  const [allTags, setAllTags] = useState<TagType[]>([
    ...tags,
    { id: lastIndex + 1, name: "..." },
  ]);

  /* navigation 추가 */
  const navigation =
    useNavigation<MyNavigationProp<keyof RootStackParamList>>();

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {allTags.map((tag, index) => (
        <Tag
          key={index + 1}
          name={tag.name}
          onPress={() => {
            if (index === allTags.length - 1) {
              navigation.navigate("태그 편집");
            }
          }}
          usePressedStyle={false}
        />
      ))}
    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  /* 태그 컨테이너 스타일 */
  container: {
    flexDirection: "row",
    width: screenWidth - 20,
    height: 50,
    marginHorizontal: 10,
    marginTop: 5,
  },
});

export default Tags;
