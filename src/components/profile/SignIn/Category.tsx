import { View, Text } from "react-native";

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
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{label}</Text>
      <View style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
        {category.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </View>
    </View>
  );
}

export default Category;
