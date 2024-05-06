// Libraries
import { useState } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useRecoilValue } from "recoil";

// Recoil
import { CurrentPeriod, PlanConfirmList } from "@/state/store/PlanRecoil";

// API
import { getTransCoord } from "@/api/PlanApi";

// Data
import { categories } from "@/data/categories";

// Interface
import { PlanConfirmListItem } from "@/interface/Plan";

// Modules
import Colors from "@/modules/Color";

// Components
import GlobalModal from "../Modal";

interface PlanConfirmItemProps {
  item: PlanConfirmListItem;
  index: number;
}

const PlanConfirmItem = ({ item, index }: PlanConfirmItemProps) => {
  const category = categories.find((c) => c.value === item.item.category);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>(item.description);
  const currentPeriod = useRecoilValue(CurrentPeriod);
  const [planConfirmList, setPlanConfirmList] = useRecoilState(PlanConfirmList);

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

  const saveDescription = () => {
    const list = planConfirmList.periodPlan[currentPeriod];
    const newList = list.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          description: content,
        };
      }
      return item;
    });

    setPlanConfirmList({
      ...planConfirmList,
      periodPlan: {
        ...planConfirmList.periodPlan,
        [currentPeriod]: newList,
      },
    });

    setModalVisible(false);
  };

  const writeHandler = () => {
    setContent(item.description);
    setModalVisible(true);
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
      <TouchableOpacity style={styles.cancel} onPress={writeHandler}>
        <AntDesign name="edit" size={20} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: item.item.photo }} style={styles.image} />

      <GlobalModal
        type="center"
        visible={modalVisible}
        setVisible={setModalVisible}
      >
        <View
          style={{
            width: 300,
            backgroundColor: Colors.WHITE,
          }}
        >
          <View style={styles.modalHeader}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>메모</Text>
          </View>
          <TextInput
            placeholder="내용을 입력하세요"
            multiline
            value={content}
            onChangeText={setContent}
            style={styles.modalInput}
          />
          <View style={styles.modalFooter}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.footerItem}
            >
              <Text style={{ color: Colors.GRAY_MEDIUM, fontSize: 16 }}>
                취소
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={saveDescription}
              style={styles.footerItem}
            >
              <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GlobalModal>
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
  modalHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCancel: {
    position: "absolute",
    right: 10,
  },
  modalInput: {
    padding: 10,
    paddingTop: 15,
    margin: 10,
    borderWidth: 0.5,
    borderColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    minHeight: 120,
  },
  modalFooter: {
    flexDirection: "row",
    padding: 10,
  },
  footerItem: {
    flex: 1,
    alignItems: "center",
  },
  cancel: {
    padding: 5,
    borderColor: Colors.GRAY_MEDIUM,
    marginRight: 10,
  },
});
