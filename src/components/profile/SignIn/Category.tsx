import { View, Text, StyleSheet } from "react-native";

/* components */
import Tag from "@main/Tag";

export type TagType = {
  id: number;
  name: string;
};

type CategoryType = {
  label: string;
  category: TagType[];
  onTagPress?: (id: number, name: string, isPressed: boolean) => void;
};

function Category({ label, category, onTagPress }: CategoryType) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.tagsContainer}>
        {category.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            usePressedStyle={true}
            onTagPress={onTagPress}
          />
        ))}
      </View>
    </View>
  );
}

export default Category;

const styles = StyleSheet.create({
  /* 전체 컨테이너 스타일 */
  container: { marginTop: 10, marginBottom: 20 },
  /* 각 카테고리 제목 스타일 */
  label: { fontSize: 20, fontWeight: "600" },
  /* 각 카테고리 컨테이너 스타일 */
  tagsContainer: { flexDirection: "row", flexWrap: "wrap" },
});
