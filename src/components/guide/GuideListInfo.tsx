import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";
import { styles as tagStyle } from "@main/Tags";
import { TagType } from "@/data/tags";
import { checkFollow } from "@components/guide/GuideListPlan";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";

const TempBar = ({ progress }: { progress: number }) => {
  const reversedProgress = 100 - progress;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { height: `${reversedProgress}%` }]} />
    </View>
  );
};

/* 나이대 계산 함수 */
export const calculateAgeRange = (birthDate: string) => {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth() - birthDateObj.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  const ageRange =
    age >= 10 && age < 20
      ? "10대"
      : age >= 20 && age < 30
      ? "20대"
      : age >= 30 && age < 40
      ? "30대"
      : age >= 40 && age < 50
      ? "40대"
      : age >= 50 && age < 60
      ? "50대"
      : "60대 이상";

  return ageRange;
};

function GuideListInfo({
  guide,
  userTags,
}: {
  guide: GuideType;
  userTags: TagType[];
}) {
  /* 가이드 팔로우 여부 */
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const [guideTagsWithUsers, setGuideTagsWithUsers] = useState<TagType[]>([]);
  const [highlightedTags, setHighlightedTags] = useState<boolean[]>([]);

  const checkSameTags = () => {
    const isSameTag = guide.tags.map((tag) => false);
    const newHighlightedTags: boolean[] = [];

    guide.tags.forEach((tag, index) => {
      userTags.forEach((userTag) => {
        if (tag.name === userTag.name) {
          isSameTag[index] = true;
        }
      });
    });

    const newGuideTags: TagType[] = [];

    guide.tags.forEach((tag, index) => {
      if (isSameTag[index]) {
        newGuideTags.push(tag);
        newHighlightedTags.push(true);
      }
    });

    guide.tags.forEach((tag, index) => {
      if (!isSameTag[index]) {
        newGuideTags.push(tag);
        newHighlightedTags.push(false);
      }
    });

    setGuideTagsWithUsers(newGuideTags);
    setHighlightedTags(newHighlightedTags);
  };

  useEffect(() => {
    checkSameTags();
  }, [guide.tags, userTags]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: guide.photo }} style={styles.guideImage} />
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 9 }}>{guide.temp}℃</Text>
              <TempBar progress={guide.temp} />
            </View>
          </View>
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
              <Text style={{ fontWeight: "bold" }}>{guide.guideCount}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text>평점</Text>
              <Text style={{ fontWeight: "bold" }}>
                {guide.rating.toFixed(1)}
              </Text>
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
        {guideTagsWithUsers.map((tag, index) => (
          <View
            key={tag.id}
            style={{
              ...tagStyle.tag,
              height: 30,
              marginVertical: 2,
              backgroundColor: highlightedTags[index]
                ? Colors.BASKETBALL_ORANGE
                : Colors.WHITE,
            }}
          >
            <Text
              style={{
                color: highlightedTags[index] ? Colors.WHITE : Colors.BLACK,
                fontSize: 10,
              }}
            >
              {tag.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* 팔로우 버튼 */}
      <Pressable
        onPress={() => {
          checkFollow({ isFollowed, setIsFollowed });
        }}
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
    width: 360,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    elevation: 5,
  },
  /* 가이드 이미지 */
  guideImage: { width: 70, height: 70, borderRadius: 100 },
  /* 온도 바 */
  progressBarContainer: {
    width: 5,
    height: 60,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    borderWidth: 0.7,
    borderRadius: 10,
    overflow: "hidden",
  },
  emptyBar: {
    flex: 1,
  },
  progressBar: {
    backgroundColor: Colors.WHITE,
    width: "100%",
  },

  /* 가이드 횟수, 평점 container */
  guideNumberStars: {
    width: "80%",
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
    top: -10,
    right: 0,
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
