import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

/* Pages */
import Guide from "@guideMain/Guide";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Colors from "@/modules/Color";
import { HomeStackParamList } from "@/stacks/HomeStack";
import { guides } from "@/data/guides";

function Guides() {
  /* Navigation */
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>가이드 추천</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.moreButton}
          onPress={() => {
            navigation.navigate("GuideStack");
          }}
        >
          <Text style={{ color: Colors.WHITE }}>가이드 매칭 →</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.guidesContainer}
      >
        {guides.map(
          (guide, index) =>
            index < 5 && (
              <Guide
                key={guide.id}
                photo={guide.photo}
                gender={guide.gender}
                name={guide.name}
                description={guide.description}
                rating={guide.rating}
              />
            )
        )}
      </ScrollView>
    </View>
  );
}

export default Guides;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  /* 더보기 버튼 스타일 */
  moreButton: {
    height: 40,
    marginRight: 10,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.BASKETBALL_ORANGE,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    elevation: 5,
  },
  /* 제목 컨테이너 스타일 */
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  /* 제목 스타일 */
  title: { fontWeight: "700", fontSize: 25, marginLeft: 5, lineHeight: 50 },
  guidesContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
    height: 290,
  },
});
