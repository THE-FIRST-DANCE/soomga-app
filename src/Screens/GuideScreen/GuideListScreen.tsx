import Screen from "@/components/Screen";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";
import Colors from "@/modules/Color";
import GuideListInfo from "@/components/guide/GuideListInfo";

function GuideListScreen() {
  const route = useRoute<RouteProp<GuideStackParamList>>();

  const addGuides = route.params?.addedGuides;

  const [currentTab, setCurrentTab] = useState<string>("기본정보");

  const handleCurrentTab = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <Screen>
      <View style={styles.tabBar}>
        <View style={{ flexDirection: "row", height: 40 }}>
          {/* 기본정보 탭 */}
          <Pressable onPress={() => handleCurrentTab("기본정보")}>
            <Text
              style={{
                ...styles.tabStyle,
                color:
                  currentTab === "기본정보" ? Colors.BLACK : Colors.GRAY_DARK,
              }}
            >
              기본정보
            </Text>
          </Pressable>
          {/* 플랜 탭 */}
          <Pressable onPress={() => handleCurrentTab("플랜")}>
            <Text
              style={{
                ...styles.tabStyle,
                color: currentTab === "플랜" ? Colors.BLACK : Colors.GRAY_DARK,
              }}
            >
              플랜
            </Text>
          </Pressable>
          {/* 서비스 탭 */}
          <Pressable onPress={() => handleCurrentTab("서비스")}>
            <Text
              style={{
                ...styles.tabStyle,
                color:
                  currentTab === "서비스" ? Colors.BLACK : Colors.GRAY_DARK,
              }}
            >
              서비스
            </Text>
          </Pressable>
        </View>
        <View>
          <Text style={{ lineHeight: 30 }}>{addGuides?.length}명 선택함</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {addGuides?.map((guide, index) => (
          <GuideListInfo key={index} guide={guide} />
        ))}
      </ScrollView>
    </Screen>
  );
}

export default GuideListScreen;

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: "space-between",
    width: "90%",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
