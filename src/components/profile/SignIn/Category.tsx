import { View, Text, StyleSheet } from "react-native";

/* components */
import Tag from "@main/Tag";

type TagType = {
  id: number;
  name: string;
};

type CategoryType = {
  label: string;
  category: TagType[];
};

function Category({ label, category }: CategoryType) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagsContainer}>
        {category.map((tag) => (
          <Tag key={tag.id} name={tag.name} usePressedStyle={true} />
        ))}
      </View>
    </View>
  );
}

export default Category;

const styles = StyleSheet.create({
  /* 전체 컨테이너 스타일 */
  container: { marginTop: 20, marginBottom: 20 },
  /* 각 카테고리 제목 스타일 */
  label: { fontSize: 20, fontWeight: "600" },
  /* 각 카테고리 컨테이너 스타일 */
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
});
