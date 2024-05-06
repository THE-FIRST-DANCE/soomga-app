// Libraries
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";

// API
import { addPlanComment, deletePlanComment } from "@/api/PlanApi";

// Interface
import { PlanComment } from "@/interface/Plan";

// Modules
import Colors from "@/modules/Color";

const PlanDetailCommentsTab = ({
  comments,
  planId,
}: {
  comments: PlanComment[];
  planId: number;
}) => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: addPlanComment,
    onSettled: () => {
      setText("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["planDetail", planId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deletePlanComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["planDetail", planId],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onAddComment = () => {
    if (!text) return;
    const planCommentDto = {
      planId,
      content: text,
      memberId: 2, // TODO
    };
    addComment(planCommentDto);
  };

  const onDeleteComment = (commentId: number) => {
    Alert.alert("댓글을 삭제하시겠습니까?", "", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: () => deleteComment(commentId),
      },
    ]);
  };

  return (
    <View style={styles.commentsContainer}>
      <View style={styles.commentInput}>
        <Image
          style={styles.commentInputUser}
          source={{ uri: "https://picsum.photos/200" }}
        />
        <TextInput
          style={styles.commentInputText}
          value={text}
          onChangeText={setText}
          placeholder="댓글을 입력해주세요"
          multiline
        />
        <TouchableOpacity style={styles.commentButton} onPress={onAddComment}>
          <AntDesign name="enter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.commentHeader}>Comments</Text>
      <ScrollView style={styles.commentList}>
        {comments?.map((comment) => (
          <View key={comment.id} style={styles.comment}>
            <View style={styles.commentUser}>
              <Image
                style={styles.commentInputUser}
                source={{ uri: "https://picsum.photos/200" }}
              />
              <Text style={styles.userName}>{comment.member.nickname}</Text>
            </View>
            <Text style={styles.commentText}>{comment.content}</Text>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => onDeleteComment(comment.id)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    flexDirection: "column",
    padding: 10,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  commentInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
  },
  commentInputUser: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
  commentInputText: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 50,
  },
  commentButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.BLUE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  comment: {
    position: "relative",
    padding: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
  },
  commentHeader: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  commentList: {
    flexDirection: "column",
    marginBottom: 10,
  },
  commentUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: {
    marginTop: 10,
    fontSize: 16,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  delete: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#888",
  },
});

export default PlanDetailCommentsTab;
