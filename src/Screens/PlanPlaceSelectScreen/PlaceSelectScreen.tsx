import Screen from "@/components/Screen";
import PlaceSelectTab from "@/components/plan/PlaceSelectTab";
import Colors from "@/modules/Color";
import { PlanInfo } from "@/state/store/PlanRecoil";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";

const PlaceSelectScreen = () => {
  const [currentTab, setCurrentTab] = useState<"select" | "new">("select");
  const planInfo = useRecoilValue(PlanInfo);

  return (
    <Screen title="장소 추가">
      <View style={styles.tabSelect}>
        <TouchableOpacity
          onPress={() => setCurrentTab("select")}
          style={[
            styles.tab,
            currentTab === "select" && {
              borderBottomWidth: 1,
              borderBottomColor: Colors.BLUE,
            },
          ]}
        >
          <Text style={styles.tabName}>장소 검색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentTab === "new" && {
              borderBottomWidth: 1,
              borderBottomColor: Colors.BLUE,
            },
          ]}
          onPress={() => setCurrentTab("new")}
        >
          <Text style={styles.tabName}>신규 장소 등록</Text>
        </TouchableOpacity>
      </View>

      {currentTab === "select" ? (
        <PlaceSelectTab region={planInfo.province} />
      ) : (
        <View>
          <Text>신규 장소 등록</Text>
        </View>
      )}
    </Screen>
  );
};

export default PlaceSelectScreen;

const styles = StyleSheet.create({
  tabSelect: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  tabName: {
    fontSize: 20,
    color: Colors.BLUE,
  },
});
