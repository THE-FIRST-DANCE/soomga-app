import { getTransCoord } from "@/api/PlanApi";
import { categories } from "@/data/categories";
import { PlanConfirmListItem } from "@/interface/Plan";
import Colors from "@/modules/Color";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PlanConfirmItemProps {
  item: PlanConfirmListItem;
  index: number;
}

const PlanConfirmItem = ({ item, index }: PlanConfirmItemProps) => {
  const category = categories.find((c) => c.value === item.item.category);

  const onClick = async () => {
    const { x: originX, y: originY } = await getTransCoord(
      item.item.longitude,
      item.item.latitude
    );
    const { x: destX, y: destY } = await getTransCoord(
      item.nextLng,
      item.nextLat
    );

    const mapType = "TYPE_MAP";
    const target = "transit";
    const rt = originX + "," + originY + "," + destX + "," + destY;
    const rt1 = item.item.name;
    const rt2 = item.nextPlaceName;

    // 카카오
    Linking.openURL(
      `https://map.kakao.com/?map_type=${mapType}&target=${target}&rt=${rt}&rt1=${rt1}&rt2=${rt2}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.order}>
          <Text style={styles.orderText}>{index + 1}</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.item}>
        <Text style={styles.name}>{item.item.name}</Text>
        <Text style={styles.category}>{category?.label}</Text>
        <Text style={styles.stayTime}>{item.stayTime}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text>{item.nextTime}</Text>
          <TouchableOpacity onPress={onClick}>
            <Text style={{ color: Colors.BLUE }}>
              {item.nextPlaceId ? "경로보기" : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={{ uri: item.item.photo }} style={styles.image} />
    </View>
  );
};

export default PlanConfirmItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  order: {
    width: 20,
    height: 20,
    margin: 10,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  orderText: {
    color: Colors.WHITE,
  },
  line: {
    width: 1,
    height: 50,
    backgroundColor: Colors.BLACK,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    gap: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    color: Colors.GRAY_DARK,
  },
  stayTime: {
    fontSize: 12,
    color: Colors.GRAY_MEDIUM,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});
