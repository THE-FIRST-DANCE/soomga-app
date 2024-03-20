import { StyleSheet, View, Text, ImageBackground, Modal } from "react-native";
import { useEffect, useState } from "react";
import { guides } from "@/data/guides";
import Colors from "@/modules/Color";

/* Components */
import GuideInfo from "@/components/guide/GuideInfo";
import { styles as tagStyle } from "@/components/main/Tags";
import GuideAddButton from "@/components/guide/GuideAddButton";
import GuideModal from "@/components/guide/GuideModal";

/* vector-icons */
import { AntDesign } from "@expo/vector-icons";

export type GuideType = {
  id: number;
  photo: string;
  name: string;
  birthDate: string;
  gender: string;
  description: string;
  stars: number;
  region: string;
  language: string[];
  tags: {
    id: number;
    name: string;
  }[];
};

type GuideMatchingScreenType = {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
};

function GuideMatchingModal({
  isModalVisible,
  setIsModalVisible,
}: GuideMatchingScreenType) {
  /* 각 가이드 인덱스 */
  const [guideIndex, setGuideIndex] = useState<number>(0);
  const guide = guides[guideIndex];

  /* 관심있는 가이드들 저장할 배열 */
  const [addedGuides, setAddedGuides] = useState<GuideType[]>([]);

  useEffect(() => {
    const guideNames = addedGuides.map((guide) => guide.name);
    console.log(guideNames);
  }, [addedGuides]);

  /* 가이드 정보 보기 / 더 찾아보기 모달 */
  const [isConfirmModalVisible, setIsConfirmModalVisible] =
    useState<boolean>(false);

  /* 가이드 인덱스 handle 함수, 마지막 인덱스일 경우 모달 표시 */
  const handleGuideIndex = () => {
    if (guideIndex !== guides.length - 1) {
      setGuideIndex((prevIndex) => {
        if (prevIndex !== guides.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    } else {
      setIsConfirmModalVisible(true);
    }
  };

  return (
    <Modal animationType="fade" visible={isModalVisible}>
      <ImageBackground
        source={{
          uri: "https://i.namu.wiki/i/saeuTko2Hz3er7w9ju2rcMN3iio86iEEY-lC2rXQ4orb4R1BETVBfrauHRWZUBQE_Z-L-KKL9RlZ5Jpmw1cBJg.webp",
        }}
        style={styles.planImage}
      >
        <View style={styles.guideInfoContainer}>
          {/* 가이드 정보 */}
          <GuideInfo guide={guide} />
          {/* 가이드 태그 */}
          <View style={styles.guideTagContainer}>
            {guide.tags.map((tag) => (
              <View key={tag.id} style={styles.guideTag}>
                <Text style={styles.tagText}>{tag.name}</Text>
              </View>
            ))}
          </View>
          <GuideAddButton
            onAddPress={() => {
              setAddedGuides([...addedGuides, guide]);
              handleGuideIndex();
            }}
            onNotAddPress={() => {
              handleGuideIndex();
            }}
          />
        </View>
      </ImageBackground>
      <GuideModal
        addedGuides={addedGuides}
        isConfirmModalVisible={isConfirmModalVisible}
      />
      <AntDesign
        name="close"
        size={30}
        color={Colors.WHITE}
        style={styles.closeButton}
        onPress={() => setIsModalVisible(false)}
      />
    </Modal>
  );
}

export default GuideMatchingModal;

const styles = StyleSheet.create({
  /* 가이드 플랜 이미지 스타일 */
  planImage: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
    justifyContent: "flex-end",
  },
  /* 가이드 정보 container 스타일 */
  guideInfoContainer: {
    backgroundColor: Colors.WHITE,
    height: 300,
    alignItems: "center",
  },
  /* 가이드 태그 container 스타일 */
  guideTagContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  /* 가이드 태그 스타일 */
  guideTag: { ...tagStyle.tag, height: 30, marginVertical: 3 },
  tagText: { fontSize: 10, fontWeight: "bold" },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});
