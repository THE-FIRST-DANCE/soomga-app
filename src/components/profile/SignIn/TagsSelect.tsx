import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

/* components */
import TagComponent from "@signIn/Category";
import { tags } from "@/data/tags";

function TagsSelect() {
  return (
    <View style={{ marginHorizontal: 25 }}>
      {/* 제목, 부제목 */}
      <Text style={styles.title}>환영합니다!</Text>
      <Text style={styles.subtitle}>
        여행의 시작, {"\n"}
        <Text style={styles.soomgaText}>SOOMGA</Text>
        <Text>와 함께라면</Text> {"\n"}
        당신만의 특별한 여행이 펼쳐집니다.
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.tagSelectTitle}>태그 선택</Text>
        <TouchableOpacity style={{ marginTop: 20, marginRight: 10 }}>
          <Text style={{ fontSize: 20, color: "#DC2626" }}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{ height: 460, marginTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <TagComponent label="MBTI" category={tags.mbti} />
        <TagComponent label="엔터테인먼트" category={tags.entertainment} />
        <TagComponent label="취미 & 관심사" category={tags.hobby} />
        <TagComponent label="캐릭터" category={tags.character} />
        <TagComponent label="라이프스타일" category={tags.lifestyle} />
        <TagComponent label="아트 & 뷰티" category={tags.artBeauty} />
        <TagComponent label="음식" category={tags.foods} />
        <TagComponent label="스포츠" category={tags.sports} />
        <TagComponent label="웰빙" category={tags.wellbeing} />
        <TagComponent label="재테크" category={tags.investment} />
        <TagComponent label="커리어 & 전공" category={tags.career} />
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
    marginTop: 100,
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
});
