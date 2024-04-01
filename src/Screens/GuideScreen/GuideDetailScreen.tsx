import Screen from "@/components/Screen";
import { GuideStackParamList } from "@/stacks/GuideStack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { calculateAgeRange, TempBar } from "@/components/guide/GuideListInfo";
import Colors from "@/modules/Color";

function GuideDetailScreen() {
  const route = useRoute<RouteProp<GuideStackParamList, "GuideDetailScreen">>();

  const { guide } = route.params;

  return (
    <Screen>
      <View>
        <ImageBackground
          source={{ uri: guide.photo }}
          style={{ width: "100%", height: 400, opacity: 0.6 }}
        >
          <View
            style={{ position: "absolute", left: 30, bottom: 30, zIndex: 1 }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 40 }}>{guide.name}</Text>
              <Text style={{ fontSize: 20, marginLeft: 10 }}>
                {calculateAgeRange(guide.birthDate)}
              </Text>
            </View>
            <Text>n시간 전 접속</Text>
          </View>
          <View
            style={{
              position: "absolute",
              right: 10,
              alignItems: "center",
              top: "30%",
            }}
          >
            <Text>{guide.temp}℃</Text>
            <TempBar style={{ width: 10, height: 130 }} progress={guide.temp} />
          </View>
        </ImageBackground>
      </View>
    </Screen>
  );
}

export default GuideDetailScreen;
