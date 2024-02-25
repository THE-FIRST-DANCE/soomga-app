import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

/* Tag 타입 import */
import { Tag } from "@main/Tags";

/* vector-icons */
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type GuideType = {
  photo: string;
  name: string;
  gender: string;
  description: string;
  tags: Tag[];
};

function Guide({ photo, name, gender, description, tags }: GuideType) {
  const guideGender = gender === "M" ? "#4BB3FF" : "#FF8090";

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
        ></View>
        <View style={styles.information}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {name}
          </Text>
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
          <View style={{ flexDirection: "row" }}>
            <AntDesign name="star" size={18} color="#ffd900" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }}>
              {tags.map((tag) => (
                <Text key={tag.id}>{tag.name}, </Text>
              ))}
            </Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <Text>채팅하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Guide;

const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 270,
    marginHorizontal: 8,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  whiteBackground: { height: 270, backgroundColor: "white", opacity: 0.6 },
  information: {
    position: "absolute",
    left: 15,
    bottom: 15,
    zIndex: 1,
  },
  name: { fontSize: 30, height: 40 },
  description: {
    marginLeft: 5,
    width: 180,
    height: 20,
    lineHeight: 17,
  },
  stars: {
    marginLeft: 5,
    lineHeight: 20,
  },
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
