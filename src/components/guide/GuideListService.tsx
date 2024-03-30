import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";
import { checkFollow } from "@components/guide/GuideListPlan";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";

function GuideListService({ guide }: { guide: GuideType }) {
  /* 가이드 팔로우 여부 */
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.guideContainer}>
          <Image source={{ uri: guide.photo }} style={styles.guideImage} />
          <Text style={{ fontSize: 18 }}>{guide.name}</Text>
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 12 }}>
            n시간 전 접속
          </Text>
        </View>
        <View style={styles.planContainer}>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>서비스 1</Text>
            <Text style={styles.planDescription}>
              Service's description....
            </Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>서비스 2</Text>
            <Text style={styles.planDescription}>
              Service's description....
            </Text>
          </View>
          <View style={styles.plan}>
            <Text style={styles.planTitle}>서비스 3</Text>
            <Text style={styles.planDescription}>
              Service's description....
            </Text>
          </View>
        </View>
      </View>
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

export default GuideListService;

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
