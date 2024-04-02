import Screen from "@/components/Screen";
import { GuideStackParamList } from "@/stacks/GuideStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { calculateAgeRange, TempBar } from "@/components/guide/GuideListInfo";
import { useRef, useState } from "react";
import GuideDetailInfo from "@/components/guide/GuideDetailinfo";
import GuideDetailPlan from "@/components/guide/GuideDetailPlan";
import GuideDetailService from "@/components/guide/GuideDetailService";
import GuideDetailSchedule from "@/components/guide/GuideDetailSchedule";
import GuideDetailReview from "@/components/guide/GuideDetailReview";

function GuideDetailScreen() {
  const route = useRoute<RouteProp<GuideStackParamList, "GuideDetailScreen">>();
  const { guide } = route.params;

  const [currentTab, setCurrentTab] = useState<string>("정보");

  const scrollViewRef = useRef<ScrollView>(null);
  const layoutWidth = Dimensions.get("window").width;

  const handleTabPress = (tabName: string, index: number) => {
    setCurrentTab(tabName);
    scrollViewRef.current?.scrollTo({ x: index * layoutWidth, animated: true });
  };

  const tabs = ["정보", "플랜", "서비스", "일정", "리뷰"];

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
  return (
    <Screen>
      <ScrollView>
        <View>
          <ImageBackground source={{ uri: guide.photo }} style={styles.image}>
            <View style={styles.infoContainer}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Text style={styles.name}>{guide.name}</Text>
                <Text style={styles.age}>
                  {calculateAgeRange(guide.birthDate)}
                </Text>
              </View>
              <Text>n시간 전 접속</Text>
            </View>
            <View style={styles.tempBarContainer}>
              <Text>{guide.temp}℃</Text>
              <TempBar style={styles.tempBar} progress={guide.temp} />
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {tabs.map((tab, index) => (
            <Pressable
              key={index}
              style={styles.tabStyle}
              onPress={() => handleTabPress(tab, index)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: currentTab === tab ? "black" : "gray",
                  },
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: "500%" }}
          onScroll={handlePageChange}
          nestedScrollEnabled={true}
        >
          <GuideDetailInfo guide={guide} />
          <GuideDetailPlan />
          <GuideDetailService />
          <GuideDetailSchedule />
          <GuideDetailReview />
        </ScrollView>
      </ScrollView>
    </Screen>
  );
}

export default GuideDetailScreen;

const styles = StyleSheet.create({
  image: { width: "100%", height: 400, opacity: 0.6 },
  infoContainer: { position: "absolute", left: 30, bottom: 30, zIndex: 1 },
  name: { fontSize: 40 },
  age: { fontSize: 20, marginLeft: 10 },
  tempBarContainer: {
    position: "absolute",
    right: 10,
    alignItems: "center",
    top: "30%",
  },
  tempBar: { width: 10, height: 130 },
  tabStyle: {
    width: "20%",
    alignItems: "center",
  },
  tabText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
