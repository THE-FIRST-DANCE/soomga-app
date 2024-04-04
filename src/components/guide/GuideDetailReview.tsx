import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import { G, Path, Rect, Svg } from "react-native-svg";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

interface GuideReview {
  id: number;
  writer_name: string;
  communication_score: number;
  kindness_score: number;
  location_score: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const reviewsWithGuideInfo: GuideReview[] = [
  {
    id: 1,
    communication_score: 5,
    kindness_score: 4,
    location_score: 4,
    content:
      "일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요! 일본어 잘해요!",
    created_at: new Date("2024-01-02"),
    updated_at: new Date(),
    writer_name: "うきょう",
  },
  {
    id: 2,
    communication_score: 5,
    kindness_score: 4,
    location_score: 5,
    content: "일본어 잘해요!",
    created_at: new Date("2024-01-03"),
    updated_at: new Date(),
    writer_name: "けんた",
  },
  {
    id: 3,
    communication_score: 5,
    kindness_score: 5,
    location_score: 5,
    content: "일본어 잘해요!",
    created_at: new Date("2024-01-04"),
    updated_at: new Date(),
    writer_name: "ゆうき",
  },
  {
    id: 4,
    communication_score: 3,
    kindness_score: 3,
    location_score: 4,
    content: "일본어 잘해요!",
    created_at: new Date("2024-01-05"),
    updated_at: new Date(),
    writer_name: "ほたか",
  },
];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}. ${month}. ${day}`;
};

const ReviewComponent = ({ review }: { review: GuideReview }) => {
  const rating =
    (review.communication_score +
      review.kindness_score +
      review.location_score) /
    3;

  const hideFullName = (name: string) => {
    if (name.length > 1) {
      return name.slice(0, 1) + "**";
    } else {
      return name;
    }
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.reviewInfoText}>
            {hideFullName(review.writer_name)}
          </Text>
          <Text style={{ fontSize: 12 }}>{formatDate(review.created_at)}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.reviewInfoText}>수정</Text>
          <Text style={styles.reviewInfoText}>삭제</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        {[...Array(Math.floor(rating))].map((_, index) => (
          <AntDesign
            key={index}
            name="star"
            size={20}
            color={Colors.STAR_YELLOW}
          />
        ))}
        <Text style={styles.reviewInfoText}>{rating.toFixed(1)}</Text>
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
  );
};

function GuideDetailReview() {
  const [reviews, setReviews] = useState<GuideReview[]>(reviewsWithGuideInfo);
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<{ label: string; value: number }[]>([
    { label: "최신순", value: 1 },
    { label: "별점순", value: 2 },
  ]);

  const [currentValue, setCurrentValue] = useState<number>(1);

  const onChange = (value: number) => {
    switch (value) {
      case 1:
        setCurrentValue(1);
        break;
      case 2:
        setCurrentValue(2);
        break;
      default:
        setCurrentValue(1);
        break;
    }

    const newReviews = [...reviewsWithGuideInfo];

    switch (currentValue) {
      case 1: {
        newReviews.sort(
          (a, b) => b.created_at.getTime() - a.created_at.getTime()
        );
        break;
      }
      case 2: {
        newReviews.sort((a, b) => {
          const aScore =
            (a.communication_score + a.kindness_score + a.location_score) / 3;
          const bScore =
            (b.communication_score + b.kindness_score + b.location_score) / 3;
          return bScore - aScore;
        });
        break;
      }
      default: {
        newReviews.sort(
          (a, b) => b.created_at.getTime() - a.created_at.getTime()
        );
        break;
      }
    }

    setReviews(newReviews);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", marginVertical: 20 }}>
          <PencilSvg />
          <Text style={{ fontSize: 20 }}>{reviews.length}개의 리뷰</Text>
        </View>
        <View>
          <DropDownPicker
            open={open}
            value={currentValue}
            items={items}
            setOpen={setOpen}
            setValue={setCurrentValue}
            setItems={setItems}
            onChangeValue={() => onChange(currentValue)}
            style={styles.dropdownStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
          />
        </View>
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ marginTop: 10 }}
      >
        {reviews.map((review, index) => (
          <ReviewComponent key={index} review={review} />
        ))}
      </ScrollView>
    </View>
  );
}

export default GuideDetailReview;

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: 500,
    paddingHorizontal: 10,
  },
  tabBarText: {
    fontSize: 20,
    marginRight: 10,
    fontWeight: "bold",
  },
  reviewContainer: {
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
  },
  reviewInfoText: { marginHorizontal: 5, fontSize: 15 },
  reviewScoreText: { marginRight: 5, fontSize: 10 },
  reviewContentText: { marginTop: 10, fontSize: 16 },
  dropdownStyle: {
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

const PencilSvg = () => {
  return (
    <Svg height="24" width="24">
      <G transform="translate(0 -1028.4)">
        <G transform="matrix(1.0607 1.0607 -1.0607 1.0607 1146.8 34.926)">
          <Path
            d="m-63 1003.4v11.3 0.7 1l2 2 2-2v-1-0.7-11.3h-4z"
            fill="#ecf0f1"
          />
          <Path d="m-61 1003.4v15l2-2v-1-0.7-11.3h-2z" fill="#bdc3c7" />
          <Rect fill="#e67e22" height="11" width="4" x="-63" y="1004.4" />
          <Path
            d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h4v-1c0-1.1-0.895-2-2-2z"
            fill="#7f8c8d"
          />
          <G transform="translate(-7,1)">
            <Path
              d="m-55.406 1016 1.406 1.4 1.406-1.4h-1.406-1.406z"
              fill="#34495e"
            />
            <Path d="m-54 1016v1.4l1.406-1.4h-1.406z" fill="#2c3e50" />
          </G>
          <Path d="m-61 1000.4c-1.105 0-2 0.9-2 2v1h2v-3z" fill="#95a5a6" />
          <Rect fill="#d35400" height="11" width="2" x="-61" y="1004.4" />
        </G>
      </G>
    </Svg>
  );
};
