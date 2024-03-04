import { categories } from "@/data/categories";
import Colors from "@/modules/Color";
import {
  CurrentPeriod,
  PeriodPlanRecoil,
  PlanListItem,
} from "@/state/store/PlanRecoil";
import React, { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import useSubstring from "@/hooks/useSubString";
import { useRecoilState, useRecoilValue } from "recoil";

interface PlaceSelectedListItemProps {
  item: PlanListItem;
}

const PlaceSelectedListItem = ({ item }: PlaceSelectedListItemProps) => {
  const name = useSubstring(item.item.name, 10);
  const address = useSubstring(item.item.address, 10);
  const category = categories.find((c) => c.value === item.item.category);

  const [periodPlan, setPlanList] = useRecoilState(PeriodPlanRecoil);
  const currentPeriod = useRecoilValue(CurrentPeriod);
  const currentPlan = periodPlan[currentPeriod] || [];

  const [timeMod, setTimeMod] = useState<boolean>(false);
  const [hour, setHour] = useState<number>(1);
  const [minute, setMinute] = useState<number>(0);

  const deleteItem = () => {
    const newPlan = currentPlan.filter(
      (plan) => plan.item.placeId !== item.item.placeId
    );
    const newPlanOrder = newPlan.map((plan, index) => {
      return {
        ...plan,
        order: index + 1,
      };
    });
    setPlanList({
      ...periodPlan,
      [currentPeriod]: newPlanOrder,
    });
  };

  // 머무는 시간 수정
  const changeTime = () => {
    setTimeMod(false);
    const newPlan = currentPlan.map((plan) => {
      if (plan.item.placeId === item.item.placeId) {
        return {
          ...plan,
          stayTime: `${hour}시간 ${minute}분`,
        };
      }
      return plan;
    });

    setPlanList({
      ...periodPlan,
      [currentPeriod]: newPlan,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.order}>
        <Text style={styles.orderText}>{item.order}</Text>
      </View>
      {timeMod ? (
        <View style={styles.timeMod}>
          <View>
            <Text>머무는 시간 설정</Text>
          </View>

          <TextInput
            style={styles.timeInput}
            keyboardType="number-pad"
            value={String(hour)}
            onChangeText={(text) => setHour(Number(text))}
          />
          <Text>시간</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="number-pad"
            value={String(minute)}
            onChangeText={(text) => setMinute(Number(text))}
          />
          <Text>분</Text>

          <TouchableOpacity
            style={{ flex: 0.5, alignItems: "center" }}
            onPress={changeTime}
          >
            <Text style={styles.timeConfirm}>확인</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.item}>
          <Image
            style={styles.itemImage}
            source={{
              uri: item.item.photo,
            }}
          />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{name}</Text>
            <View style={styles.itemCategoryAndAddress}>
              <Text style={styles.itemCategory}>{category?.label}</Text>
              <Text style={styles.itemAddress}>{address}</Text>
            </View>
          </View>
          <View style={styles.itemTimeAndDelete}>
            <TouchableOpacity onPress={() => setTimeMod(true)}>
              <Text style={styles.itemTime}>{item.stayTime}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteItem} style={styles.itemDelete}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default PlaceSelectedListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
    borderRadius: 10,
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
  timeMod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  timeInput: {
    flex: 0.2,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: Colors.GRAY_DARK,
    padding: 5,
    marginHorizontal: 5,
    textAlign: "center",
  },
  timeConfirm: {
    color: Colors.BLUE,
  },
});
