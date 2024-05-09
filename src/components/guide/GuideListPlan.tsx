import React, { useState } from "react";
import { View, Text, Pressable, Alert, StyleSheet, Image } from "react-native";
import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/* vector-icons */
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { TagType } from "@/data/tags";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

/* 가이드 팔로우 Confirm */
export const checkFollow = ({
  isFollowed,
  setIsFollowed,
  guideName,
}: {
  isFollowed: boolean;
  setIsFollowed: (Value: boolean) => void;
  guideName: string;
}) => {
  if (!isFollowed) {
    Alert.alert("가이드 팔로우", `${guideName} 가이드를 팔로우하시겠습니까?`, [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "확인", onPress: () => setIsFollowed(!isFollowed) },
    ]);
  } else {
    Alert.alert(
      "가이드 팔로우 취소",
      `${guideName} 가이드 팔로우를 취소하시겠습니까?`,
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "확인", onPress: () => setIsFollowed(!isFollowed) },
      ]
    );
  }
};

function GuideListPlan({
  guide,
  userTags,
}: {
  guide: GuideType;
  userTags: TagType[];
}) {
  /* 가이드 팔로우 여부 */
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  /* Navigation */
  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

  return guide?.member ? (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        navigation.navigate("GuideDetailScreen", {
          guide,
          userTags,
          initialTab: "플랜",
        });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.guideContainer}>
          {guide.member.avatar !== null ? (
            <Image
              source={{
                uri: guide.member.avatar,
              }}
              style={styles.guideImage}
            />
          ) : (
            <Image
              source={require("@/assets/defaultProfile.png")}
              style={styles.guideImage}
            />
          )}
          <Text style={{ fontSize: 13 }}>{guide.member.nickname}</Text>
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 12 }}>
            n시간 전 접속
          </Text>
        </View>
        <View style={styles.planContainer}>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>플랜 1</Text>
            <Text style={styles.planDescription}>Plan's description....</Text>
            <MaterialIcons
              name="access-time"
              size={13}
              color="black"
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.planTime}>총 n시간</Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>플랜 2</Text>
            <Text style={styles.planDescription}>Plan's description....</Text>
            <MaterialIcons
              name="access-time"
              size={13}
              color="black"
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.planTime}>총 n시간</Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>플랜 3</Text>
            <Text style={styles.planDescription}>Plan's description....</Text>
            <MaterialIcons
              name="access-time"
              size={13}
              color="black"
              style={{ marginLeft: 15 }}
            />
            <Text style={styles.planTime}>총 n시간</Text>
          </View>
        </View>
      </View>
      {/* 팔로우 버튼 */}
      <Pressable
        onPress={() => {
          checkFollow({ isFollowed, setIsFollowed, guideName: guide.name });
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
    </TouchableWithoutFeedback>
  ) : (
    <View />
  );
}

export default GuideListPlan;

const styles = StyleSheet.create({
  /* 전체 container */
  container: {
    width: 360,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 15,
    paddingVertical: 25,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    elevation: 5,
  },
  guideContainer: { flex: 0.8, alignItems: "center", justifyContent: "center" },
  /* 가이드 이미지 */
  guideImage: { width: 70, height: 70, borderRadius: 100 },
  /* 플랜 container */
  planContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  /* 각 플랜 style */
  plan: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  /* 플랜 이름, 설명, 시간 */
  planTitle: { fontSize: 18 },
  planDescription: { fontSize: 10, marginLeft: 10 },
  planTime: { fontSize: 10, marginLeft: 5 },
  /* 가이드 팔로우 버튼 */
  followButton: {
    position: "absolute",
    top: -10,
    right: -10,
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
