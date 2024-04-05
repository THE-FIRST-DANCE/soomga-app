import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";
import { checkFollow } from "@components/guide/GuideListPlan";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/* Navigation */
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";
import { TagType } from "@/data/tags";

function GuideListService({
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

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        navigation.navigate("GuideDetailScreen", {
          guide,
          userTags,
          initialTab: "서비스",
        });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.guideContainer}>
          <Image source={{ uri: guide.photo }} style={styles.guideImage} />
          <Text style={{ fontSize: 18 }}>{guide.name}</Text>
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 12 }}>
            n시간 전 접속
          </Text>
        </View>
        <View style={styles.serviceContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.serviceImage}
              source={require("@/assets/seoul.png")}
            />
            <Image
              style={styles.serviceImage}
              source={require("@/assets/busan.png")}
            />
            <Image
              style={styles.serviceImage}
              source={require("@/assets/ulsan.png")}
            />
          </View>
          <View>
            <Text numberOfLines={4}>
              韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^
              ドライブが趣味ですので、送迎などもお任せください。
            </Text>
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
  serviceContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  serviceImage: { width: 70, height: 70, marginHorizontal: 5 },
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
