// Libraries
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { MaterialIcons } from "@expo/vector-icons";

// Modules
import Colors from "@/modules/Color";

// Interface
import { PlanConfirmListItem } from "@/interface/Plan";

// API
import { getTransCoord } from "@/api/PlanApi";

const PlanDetailItem = ({
  item,
  isLast,
}: {
  item: PlanConfirmListItem;
  isLast: boolean;
}) => {
  // 카카오 지도 연결 함수
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

    WebBrowser.openBrowserAsync(
      `https://map.kakao.com/?map_type=${mapType}&target=${target}&rt=${rt}&rt1=${rt1}&rt2=${rt2}`
    );
  };

  return (
    <View style={[styles.container, isLast ? null : styles.marginBottom]}>
      <View style={styles.schedule}>
        <View style={styles.scheduleImg}>
          <Image source={{ uri: item.item.photo }} style={styles.image} />
        </View>
        <View style={styles.scheduleInfo}>
          <Text style={styles.iconText}>{item.stayTime}</Text>
          <Text style={styles.name}>{item.item.name}</Text>
        </View>
        <View style={styles.description}>
          <Text>{item.description}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.routeLine} />}
      {!isLast && (
        <TouchableOpacity style={styles.route} onPress={onClick}>
          <Text style={styles.routeTime}>{item.nextTime}</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlanDetailItem;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  marginBottom: {
    marginBottom: 50,
  },
  schedule: {
    flexDirection: "row",
  },
  scheduleImg: {
    width: 50,
    height: 50,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  scheduleInfo: {
    justifyContent: "center",
    padding: 10,
    flexGrow: 0.3,
  },
  description: {
    backgroundColor: "#e1e1e1",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    color: "#666",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  routeTime: {},
  routeLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    bottom: -50,
    left: "50%",
  },
  route: {
    flexDirection: "row",
    position: "absolute",
    borderRadius: 10,
    bottom: -30,
    left: "55%",
  },
});
