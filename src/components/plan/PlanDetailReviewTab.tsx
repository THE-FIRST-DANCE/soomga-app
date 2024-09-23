import useFormatDate from "@/hooks/useFormatDate";
import { PlanReview } from "@/interface/Plan";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface PlanDetailReviewTabProps {
  reviews: PlanReview[];
}

const PlanDetailReviewTab = ({ reviews }: PlanDetailReviewTabProps) => {
  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <PlanReviewComponent key={review.id} review={review} />
      ))}
    </View>
  );
};

const PlanReviewComponent = ({ review }: { review: PlanReview }) => {
  const date = useFormatDate({ date: review.createdAt });

  return (
    <View style={styles.review}>
      <Text>{review.author.nickname}</Text>
      <Text>{date}</Text>
    </View>
  );
};

export default PlanDetailReviewTab;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  review: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
