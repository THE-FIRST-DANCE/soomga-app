import Colors from "@/modules/Color";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PlaceSelectedListItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.order}>
        <Text style={styles.orderText}>1</Text>
      </View>
      <View style={styles.item}>
        <Image
          style={styles.itemImage}
          source={{
            uri: "https://via.placeholder.com/50",
          }}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>장소 이름</Text>
          <View style={styles.itemCategoryAndAddress}>
            <Text style={styles.itemCategory}>카테고리</Text>
            <Text style={styles.itemAddress}>주소</Text>
          </View>
        </View>
        <View style={styles.itemTimeAndDelete}>
          <Text style={styles.itemTime}>0시간 0분</Text>
          <TouchableOpacity style={styles.itemDelete}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceSelectedListItem;

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
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    color: Colors.WHITE,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemCategoryAndAddress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  itemCategory: {
    fontSize: 12,
    marginRight: 5,
    color: Colors.GREEN,
  },
  itemAddress: {
    fontSize: 12,
    color: Colors.GRAY_DARK,
  },
  itemTimeAndDelete: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTime: {
    fontSize: 16,
    color: Colors.BLUE,
  },
  itemDelete: {
    marginLeft: 10,
  },
});
