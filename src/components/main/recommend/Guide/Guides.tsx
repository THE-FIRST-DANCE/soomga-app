import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

/* Pages */
import Guide from "@guideMain/Guide";

function Guides() {
  /* 임시 데이터 */
  const guides = [
    {
      id: 1,
      photo:
        "https://i.namu.wiki/i/DhV9nBu-quNX2DGgy8u1WTHT1ETgRjk-wNY5G3iwoS8VQnPZaKVBasO5J68ZnTc7Asi6TQrWsNndx-DA8YrJKnCj6O4aYB3jZtgqJNigE4rX1eBtccRttNTROlOtMZjwqJKrorfG0odZ9NLySTJg0A.webp",
      name: "카리나",
      gender: "F",
      description: "I'm Rocket Puncher!",
      stars: 4.8,
    },
    {
      id: 2,
      photo:
        "https://i.namu.wiki/i/ivTat8x6fgLRQb4JqcdHgv6xEqxZDZ1on5C9VWMNmkhyjbd1WzqE5QfqWQAkqsl4jUeJVDGv6FkmosOX9MOyn8dM_DEgecrshld6cHlQCVfKIGqeMySV-dPUIxftnMoc9zyJyDbXqOdyyEsmkI1j6w.webp",
      name: "지젤",
      gender: "M",
      description: "I'm Xenoglossy!",
      stars: 4.3,
    },
    {
      id: 3,
      photo:
        "https://i.namu.wiki/i/_BjRCJGoQhiJD8VSZ463tUHBwSaQ79HCL_ltr4gXe3Fbhw6GPboj-Kuj08O_6ALWnIDUpydPp2LLPQTuIwQn1roNR5dKS1QeZuzYPZgPP8Ft2hOoNa4tv8VidB2m1qafjT2QiYDCCG6GPUQceGQQag.webp",
      name: "윈터",
      gender: "F",
      description: "I'm Armamenter!",
      stars: 4.6,
    },
    {
      id: 4,
      photo:
        "https://i.namu.wiki/i/IV_vqb-SP63qpuzEbh4pAtD1UIqUjiIpBQf3Pt8zSbjf1PNKlpVXiz3s59iX-T1fn3lxDzdE0LGb9h7RBgNEzxw-zgOqlZcJNioIsMmcz4tmwj1Wjp0F9x26rdHrPiaE3yxOz5e3OyX9RtzD88PywQ.webp",
      name: "닝닝",
      gender: "M",
      description: "I'm E.D Hacker!",
      stars: 4.1,
    },
  ];

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>가이드 추천</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.moreButton}>
          <Text>+ 더보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.guidesContainer}
      >
        {guides.map((guide) => (
          <Guide
            key={guide.id}
            photo={guide.photo}
            gender={guide.gender}
            name={guide.name}
            description={guide.description}
            stars={guide.stars}
          />
        ))}
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
    marginRight: 10,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: "#DC2626",
    backgroundColor: "white",
    elevation: 5,
  },
  /* 제목 컨테이너 스타일 */
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  /* 제목 스타일 */
  title: { fontWeight: "700", fontSize: 25, marginLeft: 5 },
  guidesContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
    height: 290,
  },
});
