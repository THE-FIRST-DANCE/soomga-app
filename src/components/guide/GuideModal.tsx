import { guides } from "@/data/guides";
import {
  Modal,
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import { GuideType } from "@/Screens/GuideScreen/GuideMatchingScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

import Colors from "@/modules/Color";

type GuideModalType = {
  addedGuides: GuideType[];
  modalVisible: boolean;
};

function GuideModal({ addedGuides, modalVisible }: GuideModalType) {
  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

  return (
    /* 가이드 정보 보기 / 가이드 더 찾아보기 선택하는 모달 */
    <Modal animationType="fade" visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.guidePhotos}>
            {addedGuides.map((guide) => (
              <ImageBackground
                style={styles.guidePhoto}
                imageStyle={{ borderRadius: 100 }}
                key={guide.id}
                source={{ uri: guide.photo }}
              />
            ))}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
              선택할 차례입니다!
            </Text>
            <Text style={{ color: Colors.GRAY_DARK, marginTop: 10 }}>
              {guides.length}명 중 {addedGuides.length}명을 선택하셨습니다!
            </Text>
          </View>
          <View style={{ marginTop: 30, alignItems: "center" }}>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: Colors.BASKETBALL_ORANGE,
              }}
              onPress={() => {
                navigation.navigate("GuideListScreen", { addedGuides });
                console.log(addedGuides);
              }}
            >
              <Text style={{ color: "white" }}>가이드 정보 보기</Text>
            </Pressable>
            <View style={styles.button}>
              <Text style={{ color: Colors.BASKETBALL_ORANGE }}>
                가이드 더 찾아보기
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
