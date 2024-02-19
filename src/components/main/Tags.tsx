import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";

import {
  MyNavigationProp,
  RootStackParamList,
} from "../../navigation/NavigationProps";

const screenWidth = Dimensions.get("window").width;

interface Tag {
  id: string;
  tagName: string;
}

function Tags() {
  /* 임시 데이터 */
  const tags = [
    { id: "1", tagName: "#ISFJ" },
    { id: "2", tagName: "#Kpop" },
    { id: "3", tagName: "#인스타그램" },
    { id: "4", tagName: "#사진" },
    { id: "5", tagName: "#야구" },
    { id: "6", tagName: "#볼링" },
    { id: "7", tagName: "#프로그래밍" },
  ];

  /* 전체 태그 상태 관리 */
  const [allTags, setAllTags] = useState<Tag[]>([
    ...tags,
    { id: "more", tagName: "..." },
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
          <Text>{tag.tagName}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  /* 태그 컨테이너 스타일 */
  container: {
    flexDirection: "row",
    width: screenWidth - 20,
    height: 100,
    marginHorizontal: 10,
    marginTop: 5,
    position: "absolute",
    top: 100,
    zIndex: -1,
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
