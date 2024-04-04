import { View, Text, StyleSheet, Image } from "react-native";

function GuideDetailService() {
  return (
    <View style={styles.container}>
      <View style={styles.serviceContainer}>
        <Image style={styles.service} source={require("assets/seoul.png")} />
        <Image style={styles.service} source={require("assets/busan.png")} />
        <Image style={styles.service} source={require("assets/ulsan.png")} />
      </View>
      <View style={{ padding: 10 }}>
        <Text>
          韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^
          ドライブが趣味ですので、送迎などもお任せください。
        </Text>
      </View>
    </View>
  );
}

export default GuideDetailService;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 500,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  service: {
    width: "30%",
    height: 110,
    margin: "1.5%",
  },
});
