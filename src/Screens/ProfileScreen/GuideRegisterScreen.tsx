import { AreaType, getAreas } from "@/api/Area";
import Screen from "@/components/Screen";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles as tagStyle } from "@/components/main/Tags";
import Colors from "@/modules/Color";

function GuideRegisterScreen() {
  const [areas, setAreas] = useState<AreaType[]>([]);

  useEffect(() => {
    const getAreasData = async () => {
      try {
        const areas = await getAreas();
        setAreas(areas);
      } catch (error) {
        console.error(error);
      }
    };

    getAreasData();
  }, []);

  return (
    <Screen title="가이드 신청">
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.caption}>
            활동 지역
            <Text style={{ color: "red", fontSize: 10 }}>　*필수 1개 선택</Text>
          </Text>
          <View style={styles.selectItemContainer}>
            {areas.map((area, index) => (
              <View key={index} style={styles.selectItem}>
                <Text key={area.id}>{area.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.caption}>
            사용 가능 언어
            <Text style={{ color: "red", fontSize: 10 }}>　*필수 1개 선택</Text>
          </Text>
          <View style={styles.selectItemContainer}>
            {["한국어", "English", "日本語"].map((lang, index) => (
              <View key={index} style={styles.selectItem}>
                <Text>{lang}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.caption}>
            언어 자격증
            <Text style={{ color: "red", fontSize: 10, fontWeight: "medium" }}>
              　*필수 1개 선택
            </Text>
          </Text>
          <View
            style={{ ...styles.selectItemContainer, flexDirection: "column" }}
          >
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 20 }}>日本語🇯🇵</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {["N1", "N2", "N3", "N4", "N5"].map((lang, index) => (
                  <View key={index} style={styles.selectItem}>
                    <Text>{lang}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontSize: 20 }}>English 🇬🇧</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {["900 >", "800 >", "700 >", "600 >", "< 600"].map(
                  (lang, index) => (
                    <View key={index} style={styles.selectItem}>
                      <Text>{lang}</Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.6}>
          <Text style={{ color: Colors.WHITE }}>가이드 신청</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

export default GuideRegisterScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 10,
  },
  selectItemContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BLACK,
    padding: 15,
    height: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectItem: {
    ...tagStyle.tag,
    width: 70,
    alignItems: "center",
    marginVertical: 5,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    width: 90,
    height: 45,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
});
