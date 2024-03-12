import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

/* components */
import Category from "@signIn/Category";
import { tags } from "@data/tags";
import TitleSubtitle from "@signIn/TitleSubtitle";

import { getSignup } from "@/api/LoginSignUp";

/* navigation */
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  MyNavigationProp,
  RootStackParamList,
} from "@navigation/NavigationProps";

type UserTagsType = {
  id: number;
  name: string;
};

type SignupForm = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
};

function TagsSelect() {
  const userTags: UserTagsType[] = [];

  const selectTags = (id: number, name: string, isPressed: boolean) => {
    const selectedTag = {
      id,
      name,
    };
    if (isPressed) {
      // isPressed가 true이면 userTags 배열에 추가
      if (!userTags.some((tag) => tag.id === id && tag.name === name)) {
        userTags.push(selectedTag);
      }
    } else {
      // isPressed가 false이면 이미 추가된 요소라면 userTags 배열에서 제거
      const indexToRemove = userTags.findIndex(
        (tag) => tag.id === id && tag.name === name
      );
      if (indexToRemove !== -1) {
        userTags.splice(indexToRemove, 1);
      }
    }
    console.log(isPressed);
  };

  /* navigation 추가 */
  const navigation =
    useNavigation<MyNavigationProp<keyof RootStackParamList>>();

  /* route 추가 */
  const route = useRoute<RouteProp<RootStackParamList, "Tags Select">>();
  const { data } = route.params;
  console.log("68번 라인 데이터", data);

  const onSubmitForSignup = async (data: SignupForm) => {
    console.log("72번 라인 데이터", data);
    try {
      const result = await getSignup(
        data.email,
        data.nickname,
        data.password,
        data.passwordConfirm,
        data.birthDate
      );
      console.log("80번 라인 데이터", data);
      console.log(result);
    } catch (error) {
      console.log("83번 라인 데이터", data);
      console.error(error);
    }
  };

  return (
    <View style={{ marginHorizontal: 25 }}>
      <TitleSubtitle />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.tagSelectTitle}>태그 선택</Text>
        </View>
        <TouchableOpacity
          style={{ marginTop: 20, marginRight: 10 }}
          onPress={() => {
            onSubmitForSignup(data);
          }}
        >
          <Text style={styles.finishButton}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ height: 410 }} showsVerticalScrollIndicator={false}>
        <Category label="MBTI" category={tags.mbti} onTagPress={selectTags} />
        <Category
          label="엔터테인먼트"
          category={tags.entertainment}
          onTagPress={selectTags}
        />
        <Category
          label="취미 & 관심사"
          category={tags.hobby}
          onTagPress={selectTags}
        />
        <Category
          label="캐릭터"
          category={tags.character}
          onTagPress={selectTags}
        />
        <Category
          label="라이프스타일"
          category={tags.lifestyle}
          onTagPress={selectTags}
        />
        <Category
          label="아트 & 뷰티"
          category={tags.artBeauty}
          onTagPress={selectTags}
        />
        <Category label="음식" category={tags.foods} onTagPress={selectTags} />
        <Category
          label="스포츠"
          category={tags.sports}
          onTagPress={selectTags}
        />
        <Category
          label="웰빙"
          category={tags.wellbeing}
          onTagPress={selectTags}
        />
        <Category
          label="재테크"
          category={tags.investment}
          onTagPress={selectTags}
        />
        <Category
          label="커리어 & 전공"
          category={tags.career}
          onTagPress={selectTags}
        />
      </ScrollView>
    </View>
  );
}

export default TagsSelect;

const styles = StyleSheet.create({
  /* 제목 텍스트 스타일 */
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 50,
  },
  /* 부제목 스타일 */
  subtitle: {
    fontSize: 15,
    marginTop: 20,
  },
  /* soomga 텍스트 스타일 */
  soomgaText: {
    color: "#DC2626",
  },
  /* 태그 선택 제목 스타일 */
  tagSelectTitle: { fontSize: 30, fontWeight: "700", marginTop: 10 },
  /* 완료 버튼 스타일 */
  finishButton: { fontSize: 20, color: "#DC2626" },
});
