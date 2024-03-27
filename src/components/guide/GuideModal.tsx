import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { TagType } from "@/data/tags";
import { GuideType } from "@/data/guides";
import Colors from "@/modules/Color";

/* Navigation */
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GuideStackParamList } from "@/stacks/GuideStack";

interface GuideModalType {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  guidesInSelectedRegions: GuideType[];
  userTags: TagType[];
}

function GuideModal({
  isModalVisible,
  setIsModalVisible,
  guidesInSelectedRegions,
  userTags,
}: GuideModalType) {
  const navigation = useNavigation<NavigationProp<GuideStackParamList>>();

  return (
    /* 가이드 정보 보기 / 가이드 더 찾아보기 선택하는 모달 */
    <Modal animationType="fade" visible={isModalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.guidePhotos}>
            {guidesInSelectedRegions.map((guide, index) =>
              index < 3 ? (
                index === 1 ? (
                  <Image
                    key={index}
                    source={{ uri: guide.photo }}
                    style={[styles.guidePhoto, { width: 70, height: 70 }]}
                  />
                ) : (
                  <Image
                    key={index}
                    source={{ uri: guide.photo }}
                    style={[styles.guidePhoto, { marginTop: 20 }]}
                  />
                )
              ) : null
            )}
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 28, marginTop: 10 }}>
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
                navigation.navigate("GuideListScreen", {
                  guidesInSelectedRegions,
                  userTags,
                  isRecommended: true,
                });
                console.log(guidesInSelectedRegions);
              }}
            >
              <Text style={{ color: "white" }}>가이드 추천 받기</Text>
            </TouchableOpacity>
            <Pressable
              style={styles.button}
              onPress={() => {
                setIsModalVisible(false);
                navigation.navigate("GuideListScreen", {
                  guidesInSelectedRegions,
                  userTags,
                  isRecommended: false,
                });
                console.log(guidesInSelectedRegions);
              }}
            >
              <Text style={{ color: Colors.BASKETBALL_ORANGE }}>
                전체 리스트 보기
              </Text>
            </Pressable>
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
    width: 50,
    height: 50,
    marginHorizontal: -10,
    borderRadius: 100,
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
