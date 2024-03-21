import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { guides } from "@/data/guides";
import Colors from "@/modules/Color";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

type GuideModalType = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
};

function GuideModal({ isModalVisible, setIsModalVisible }: GuideModalType) {
  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

  return (
    /* 가이드 정보 보기 / 가이드 더 찾아보기 선택하는 모달 */
    <Modal animationType="fade" visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={{ fontWeight: "bold", fontSize: 28 }}>
            선택할 차례입니다!
          </Text>
          <View style={{ marginTop: 30, alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.button,
                backgroundColor: Colors.BASKETBALL_ORANGE,
              }}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("GuideListScreen");
                console.log(guides);
              }}
            >
              <Text style={{ color: "white" }}>가이드 추천 받기</Text>
            </TouchableOpacity>
            <View style={styles.button}>
              <Text style={{ color: Colors.BASKETBALL_ORANGE }}>
                필터로 검색하기
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GuideModal;

const styles = StyleSheet.create({
  /* 모달 container 스타일 */
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  /* 모달 스타일 */
  modal: {
    width: 300,
    height: 350,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  /* 선택된 가이드 이미지 스타일 */
  guidePhotos: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  /* 각 가이드 사진 */
  guidePhoto: {
    width: 45,
    height: 45,
    marginHorizontal: -10,
  },
  /* 각 가이드 정보 보기, 가이드 더 찾아보기 버튼 스타일 */
  button: {
    width: 270,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
});
