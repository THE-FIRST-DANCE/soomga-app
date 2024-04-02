import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";

import Colors from "@/modules/Color";
import { GuideType } from "@/data/guides";

/* navigation */
import { RouteProp, useRoute } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

/* components */
import Screen from "@/components/Screen";
import GuideListInfo from "@/components/guide/GuideListInfo";
import GuideListPlan from "@/components/guide/GuideListPlan";
import GuideListService from "@/components/guide/GuideListService";
import { FontAwesome } from "@expo/vector-icons";
import GuideFilter from "@/components/guide/GuideFilter";

function GuideListScreen() {
  const route = useRoute<RouteProp<GuideStackParamList, "GuideListScreen">>();

  const { guidesInSelectedRegions, userTags, isRecommended } = route.params;

  /* 현재 탭 */
  const [currentTab, setCurrentTab] = useState<string>("기본정보");
  const tabs = ["기본정보", "플랜", "서비스"];

  /* ScrollView에 대한 ref 생성 */
  const scrollViewRef = useRef<ScrollView>(null);
  const layoutWidth = Dimensions.get("window").width;

  /* 탭 누르면 현재 탭 업데이트 */
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

    tabs.forEach((tab, index) => {
      if (currentPage === index) {
        setCurrentTab(tab);
      }
    });
  };

  /* 필터 모달 표시 여부 */
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  /* 필터링된 가이드 저장할 변수 */
  const [guidesToRender, setGuidesToRender] = useState<GuideType[]>(
    guidesInSelectedRegions
  );

  return (
    <Screen title={isRecommended ? "추천 가이드" : "전체 리스트"}>
      <View style={styles.tabBar}>
        <View style={{ flexDirection: "row", height: 40 }}>
          {tabs.map((tab, index) => (
            <Pressable key={index} onPress={() => handleTabPress(tab, index)}>
              <Text
                style={{
                  ...styles.tabStyle,
                  color: currentTab === tab ? Colors.BLACK : Colors.GRAY_DARK,
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
        {isRecommended ? (
          <Text>{guidesToRender.length}명 추천됨</Text>
        ) : (
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() => {
              setIsFilterVisible(true);
            }}
          >
            <FontAwesome name="filter" size={20} color="black" />
            <Text style={{ marginLeft: 5 }}>필터</Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: "300%" }}
        onScroll={handlePageChange}
      >
        {/* 가이드 정보 */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {guidesToRender.map((guide, index) => (
            <GuideListInfo key={index} guide={guide} userTags={userTags} />
          ))}
        </ScrollView>
        {/* 가이드 플랜 */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {guidesToRender.map((guide, index) => (
            <GuideListPlan key={index} guide={guide} />
          ))}
        </ScrollView>
        {/* 가이드 서비스 */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {guidesToRender.map((guide, index) => (
            <GuideListService key={index} guide={guide} />
          ))}
        </ScrollView>
      </ScrollView>
      {isFilterVisible && (
        <GuideFilter
          isFilterVisible={isFilterVisible}
          setIsFilterVisible={setIsFilterVisible}
          guidesInSelectedRegions={guidesInSelectedRegions}
          setGuidesToRender={setGuidesToRender}
        />
      )}
    </Screen>
  );
}

export default GuideListScreen;

const styles = StyleSheet.create({
  /* 탭 바 스타일 */
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
  /* 각 탭 텍스트 스타일 */
  tabStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
