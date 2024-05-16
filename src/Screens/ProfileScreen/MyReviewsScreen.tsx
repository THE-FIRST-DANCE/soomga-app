import {
  formatDate,
  GuideReview,
  hideFullName,
} from "@/components/guide/GuideDetailReview";
import Screen from "@/components/Screen";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import { reviewsWithGuideInfo } from "@/components/guide/GuideDetailReview";

function MyReviewsScreen() {
  const getAvgScore = (review: GuideReview) => {
    return (
      (review.communication_score +
        review.kindness_score +
        review.location_score) /
      3
    );
  };

  return (
    <Screen title="내 리뷰">
      <View style={{ alignItems: "center" }}>
        {reviewsWithGuideInfo.map((review) => (
          <View style={styles.reviewContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.reviewInfoText}>
                  {hideFullName(review.writer_name)}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {formatDate(review.created_at)}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.reviewInfoText}>수정</Text>
                <Text style={styles.reviewInfoText}>삭제</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {[...Array(Math.floor(getAvgScore(review)))].map((_, index) => (
                <AntDesign
                  key={index}
                  name="star"
                  size={20}
                  color={Colors.STAR_YELLOW}
                />
              ))}
              <Text style={styles.reviewInfoText}>
                {getAvgScore(review).toFixed(1)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={styles.reviewScoreText}>
                의사소통 {review.communication_score.toFixed(1)}
              </Text>
              <Text style={styles.reviewScoreText}>
                친절 {review.kindness_score.toFixed(1)}
              </Text>
              <Text style={styles.reviewScoreText}>
                위치 {review.location_score.toFixed(1)}
              </Text>
            </View>
            <Text style={styles.reviewContentText}>{review.content}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

export default MyReviewsScreen;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 500,
    paddingHorizontal: 10,
  },
  dateTimePickerContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  dateTimePickerStyle: {
    width: 130,
    height: 30,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateConfirmButton: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.BASKETBALL_ORANGE,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  reviewContainer: {
    width: "90%",
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
  },
  reviewInfoText: { marginHorizontal: 5, fontSize: 15 },
  reviewScoreText: { marginRight: 5, fontSize: 10 },
  reviewContentText: { marginTop: 10, fontSize: 16 },
  dropDownStyle: {
    width: 120,
    height: 40,
    borderWidth: 0,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
  },
  listItemContainerStyle: {
    width: 120,
    backgroundColor: Colors.GRAY_MEDIUM,
  },
});
