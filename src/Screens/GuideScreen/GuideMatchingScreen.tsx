import Screen from "@/components/Screen";
import GuideInfo from "@/components/guide/GuideInfo";
import { useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { guides } from "@/data/guides";
import { tags } from "@/data/tags";
import { styles as tagStyle } from "@/components/main/Tags";
function GuideMatchingScreen() {
  const [guideIndex, setGuideIndex] = useState<number>(0);

  const guide = guides[guideIndex];

  return (
    <Screen>
      <View>
        <ImageBackground
          source={{
            uri: "https://i.namu.wiki/i/saeuTko2Hz3er7w9ju2rcMN3iio86iEEY-lC2rXQ4orb4R1BETVBfrauHRWZUBQE_Z-L-KKL9RlZ5Jpmw1cBJg.webp",
          }}
          style={styles.planImage}
        >
          <View style={styles.guideInfoContainer}>
            <GuideInfo guide={guide} />
            <View style={styles.guideTagContainer}>
              {tags.map((tag) => (
                <View key={tag.id} style={styles.guideTag}>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
    </Screen>
  );
}

export default GuideMatchingScreen;

const styles = StyleSheet.create({
  planImage: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
    justifyContent: "flex-end",
  },
  guideInfoContainer: {
    backgroundColor: "#ffffff",
    height: 300,
    alignItems: "center",
  },
  guideTagContainer: {
    flexDirection: "row",
    width: "90%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  guideTag: { ...tagStyle.tag, height: 30, marginVertical: 3 },
  tagText: { fontSize: 10, fontWeight: "bold" },
});
