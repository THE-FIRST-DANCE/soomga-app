import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

import Colors from "@/modules/Color";
import { GuideType } from "@/Screens/GuideScreen/GuideMatchingScreen";
import { calculateAgeRange } from "./GuideInfo";
import { styles as tagStyle } from "../main/Tags";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";

function GuideListInfo({ guide }: { guide: GuideType }) {
  /* 가이드 팔로우 여부 */
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  /* 가이드 팔로우 confirm */
  const checkFollow = () => {
    isFollowed
      ? Alert.alert(
          "가이드 팔로우 취소",
          `${guide.name} 가이드 팔로우를 취소하시겠습니까?`,
          [
            {
              text: "취소",
              style: "cancel",
            },
            { text: "확인", onPress: () => setIsFollowed(!isFollowed) },
          ]
        )
      : Alert.alert(
          "가이드 팔로우",
          `${guide.name} 가이드를 팔로우하시겠습니까?`,
          [
            {
              text: "취소",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "확인", onPress: () => setIsFollowed(!isFollowed) },
          ]
        );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image source={{ uri: guide.photo }} style={styles.guideImage} />
          <Text style={{ fontSize: 18 }}>{guide.name}</Text>
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 12 }}>
            n시간 전 접속
          </Text>
        </View>
        <View style={{ flex: 2, marginHorizontal: 10 }}>
          {/* 가이드 횟수, 평점 */}
          <View style={styles.guideNumberStars}>
            <View style={{ alignItems: "center" }}>
              <Text>가이드 횟수</Text>
              <Text style={{ fontWeight: "bold" }}>
                {Math.floor(Math.random() * 10000)}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>평점</Text>
              <Text style={{ fontWeight: "bold" }}>{guide.stars}</Text>
            </View>
          </View>
          {/* 지역, 나이대, 사용 언어 */}
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.infoText}>지역 | {guide.region}</Text>
            <Text style={styles.infoText}>
              나이대 | {calculateAgeRange(guide.birthDate)}
            </Text>
            <Text
              style={styles.infoText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              사용 언어 | {guide.language.join(", ")}
            </Text>
          </View>
        </View>
      </View>
      {/* 가이드 태그 */}
      <ScrollView
        nestedScrollEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {guide.tags.map((tag) => (
          <View
            key={tag.id}
            style={{ ...tagStyle.tag, height: 30, marginVertical: 2 }}
          >
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>{tag.name}</Text>
          </View>
        ))}
      </ScrollView>
      {/* 팔로우 버튼 */}
      <Pressable
        onPress={checkFollow}
        style={{
          ...styles.followButton,
          backgroundColor: isFollowed ? Colors.BASKETBALL_ORANGE : Colors.WHITE,
        }}
      >
        {isFollowed ? (
          <SimpleLineIcons
            name="user-following"
            size={21}
            color={Colors.WHITE}
          />
        ) : (
          <SimpleLineIcons name="user-follow" size={21} color={Colors.BLACK} />
        )}
      </Pressable>
    </View>
  );
}

export default GuideListInfo;

const styles = StyleSheet.create({
  /* 전체 container */
  container: {
    width: "90%",
    height: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    elevation: 20,
  },
  /* 가이드 이미지 */
  guideImage: { width: 70, height: 70, borderRadius: 100 },
  /* 가이드 횟수, 평점 container */
  guideNumberStars: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  /* 가이드 지역, 나이대, 사용 언어 텍스트 스타일 */
  infoText: { marginVertical: 2, fontSize: 13 },
  /* 가이드 태그 container */
  tagsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  /* 가이드 팔로우 버튼 */
  followButton: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    elevation: 5,
  },
});
