import { ViewStyle, View, Text, StyleSheet } from "react-native";
import { styles as TagStyle } from "../main/Tags";
import Colors from "@/modules/Color";

/* 버튼으로 선택하는 항목(언어, 성별, 자격증) */
interface SelectProps {
  caption?: string;
  certificates: string[];
  style?: ViewStyle;
}

export function SelectContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={styles.caption}>{title}</Text>
      <View>
        <View style={styles.selectContainer}>{children}</View>
      </View>
    </View>
  );
}

function SelectComponent({ caption, certificates, style }: SelectProps) {
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        {caption && <Text style={{ paddingHorizontal: 10 }}>{caption}</Text>}
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {certificates.map((certificate, index) => (
            <View
              key={index}
              style={[
                TagStyle.tag,
                { marginHorizontal: 5, alignItems: "center" },
                style,
              ]}
            >
              <Text>{certificate}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default SelectComponent;

const styles = StyleSheet.create({
  caption: { margin: 5, fontSize: 20, fontWeight: "bold" },
  selectContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.GRAY_DARK,
    justifyContent: "center",
  },
});
