import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

/* Navigation */
import {
  MyNavigationProp,
  RootStackParamList,
} from "@navigation/NavigationProps";

import {
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";

export type Tag = {
  id: number;
  name: string;
};

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
  const [allTags, setAllTags] = useState<Tag[]>([
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
        <Pressable
          key={tag.id}
          style={styles.tag}
          onPress={() => {
            if (index === allTags.length - 1) {
              navigation.navigate("태그 편집");
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

const styles = StyleSheet.create({
  /* 태그 컨테이너 스타일 */
  container: {
    flexDirection: "row",
    width: screenWidth - 20,
    height: 50,
    marginHorizontal: 10,
    marginTop: 5,
  },
  /* 각 태그 스타일 */
  tag: {
    borderColor: "#DC2626",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 3,
    marginVertical: 5,
    padding: 7,
    height: 35,
    backgroundColor: "white",
    elevation: 5,
  },
});

export default Tags;
