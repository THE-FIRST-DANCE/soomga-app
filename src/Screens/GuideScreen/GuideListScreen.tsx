import Screen from "@/components/Screen";
import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";
import Colors from "@/modules/Color";
import GuideListInfo from "@/components/guide/GuideListInfo";
import GuideListPlan from "@/components/guide/GuideListPlan";

function GuideListScreen() {
  /* 매칭 페이지에서 추가한 가이드들 */
  const route = useRoute<RouteProp<GuideStackParamList>>();
  const addGuides = route.params?.addedGuides;

  /* 현재 탭 */
  const [currentTab, setCurrentTab] = useState<string>("기본정보");

  /* ScrollView에 대한 ref 생성 */
  const scrollViewRef = useRef<ScrollView>(null);
  const layoutWidth = Dimensions.get("window").width;

  /* 탭을 누를 때 현재 탭 업데이트 */
  const handleTabPress = (tabName: string, index: number) => {
    setCurrentTab(tabName);
    /* 해당 페이지로 스크롤 */
    scrollViewRef.current?.scrollTo({ x: index * layoutWidth, animated: true });
  };

  /* 왼쪽/오른쪽으로 스크롤할 시 탭 변경 */
  const handlePageChange = (event: any) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageWidth = layoutMeasurement.width;
    const currentPage = Math.floor(contentOffset.x / pageWidth);

    if (currentPage === 0) {
      setCurrentTab("기본정보");
    } else if (currentPage === 1) {
      setCurrentTab("플랜");
    } else {
      setCurrentTab("서비스");
    }
  };

  return (
    <Screen>
      <View style={styles.tabBar}>
        <View style={{ flexDirection: "row", height: 40 }}>
          {/* 기본정보 탭 */}
          <Pressable onPress={() => handleTabPress("기본정보", 0)}>
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
          <Pressable onPress={() => handleTabPress("플랜", 1)}>
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
          <Pressable onPress={() => handleTabPress("서비스", 2)}>
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
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "300%" }}
        onScroll={handlePageChange}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {addGuides?.map((guide, index) => (
            <GuideListInfo key={index} guide={guide} />
          ))}
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {addGuides?.map((guide, index) => (
            <GuideListPlan key={index} guide={guide} />
          ))}
        </ScrollView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {addGuides?.map((guide, index) => (
            <GuideListInfo key={index} guide={guide} />
          ))}
        </ScrollView>
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
