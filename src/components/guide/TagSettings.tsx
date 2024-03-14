import Colors from "@/modules/Color";
import { StyleSheet, Text, View } from "react-native";
import { tags } from "../main/Tags";
import { styles as TagStyle } from "../main/Tags";

function TagSettings() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.title}>선택된 태그</Text>
          <Text style={{ lineHeight: 40, marginLeft: 5 }}>
            {tags.length}개 선택
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.BASKETBALL_ORANGE,
            width: 70,
            height: 35,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.WHITE }}>태그 설정</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <View key={tag.id} style={{ ...TagStyle.tag, marginVertical: 5 }}>
            <Text>{tag.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default TagSettings;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
