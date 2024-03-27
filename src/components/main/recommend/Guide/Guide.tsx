import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

/* vector-icons */
import { Octicons, AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";

/* props */
type GuideType = {
  photo: string;
  name: string;
  gender: string;
  description: string;
  stars: number;
};

function Guide({ photo, name, gender, description, stars }: GuideType) {
  const guideGender = gender === "남자" ? Colors.MALE_BLUE : Colors.FEMALE_PINK;

  return (
    <ImageBackground style={styles.container} source={{ uri: photo }}>
      <View style={styles.whiteBackground}>
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: guideGender,
            position: "absolute",
            right: 20,
            top: 20,
            borderRadius: 100,
          }}
        />
        <View style={styles.information}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="star" size={18} color={Colors.STAR_YELLOW} />
            <Text style={{ marginLeft: 3 }}>{stars}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Octicons name="note" size={15} color="black" />
            <Text
              style={styles.description}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.chatButton}>
            <Text>채팅하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Guide;

const styles = StyleSheet.create({
  /* 컨테이너 스타일 */
  container: {
    width: 230,
    height: 270,
    marginHorizontal: 8,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  /* 연한 배경색 스타일 */
  whiteBackground: {
    height: 270,
    backgroundColor: "white",
    opacity: 0.6,
  },
  /* 가이드 정보 섹션 스타일 */
  information: {
    position: "absolute",
    left: 15,
    bottom: 15,
    zIndex: 1,
  },
  /* 가이드 이름 텍스트 스타일 */
  name: { fontSize: 30, height: 40 },
  /* 가이드 자기소개 스타일 */
  description: {
    marginLeft: 5,
    width: 180,
    height: 20,
    lineHeight: 17,
  },
  /* 가이드 별점 스타일 */
  stars: {
    marginLeft: 5,
    lineHeight: 20,
  },
  /* 추천 가이드 채팅하기 버튼 스타일 */
  chatButton: {
    width: 190,
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "pink",
    alignItems: "center",
    elevation: 5,
  },
});
