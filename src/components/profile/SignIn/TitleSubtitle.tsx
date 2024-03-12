import { StyleSheet, Text, View } from "react-native";

function TitleSubtitle() {
  return (
    <View>
      {/* 제목, 부제목 */}
      <Text style={styles.title}>환영합니다!</Text>
      <Text style={styles.subtitle}>
        여행의 시작, {"\n"}
        <Text style={styles.soomgaText}>SOOMGA</Text>
        <Text>와 함께라면</Text> {"\n"}
        당신만의 특별한 여행이 펼쳐집니다.
      </Text>
    </View>
  );
}

export default TitleSubtitle;

const styles = StyleSheet.create({
  /* 제목 텍스트 스타일 */
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginTop: 50,
  },
  /* 부제목 스타일 */
  subtitle: {
    fontSize: 15,
    marginTop: 20,
  },
  /* soomga 텍스트 스타일 */
  soomgaText: {
    color: "#DC2626",
  },
});
