import Colors from "@/modules/Color";
import { GuideType } from "@/Screens/GuideScreen/GuideMatchingScreen";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { calculateAgeRange } from "./GuideInfo";
import { styles as tagStyle } from "../main/Tags";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";

function GuideListInfo({ guide }: { guide: GuideType }) {
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const checkFollow = () => {
    isFollowed
      ? Alert.alert(
          "가이드 팔로우 취소",
          `${guide.name} 가이드 팔로우를 취소하시겠습니까?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: () => setIsFollowed(!isFollowed) },
          ]
        )
      : Alert.alert(
          "가이드 팔로우",
          `${guide.name} 가이드를 팔로우하시겠습니까?`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => setIsFollowed(!isFollowed) },
          ]
        );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            source={{ uri: guide.photo }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
          <Text style={{ fontSize: 18 }}>{guide.name}</Text>
          <Text style={{ color: Colors.GRAY_DARK, fontSize: 12 }}>
            n시간 전 접속
          </Text>
        </View>
        <View style={{ flex: 2, marginHorizontal: 10 }}>
          <View
            style={{
              width: "70%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row", marginTop: 10, height: 50 }}
      >
        {guide.tags.map((tag) => (
          <View key={tag.id} style={tagStyle.tag}>
            <Text>{tag.name}</Text>
          </View>
        ))}
      </ScrollView>
      <Pressable
        onPress={() => checkFollow()}
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
  container: {
    width: "90%",
    height: 210,
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 20,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    elevation: 20,
  },
  infoText: { marginVertical: 2, fontSize: 13 },
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
