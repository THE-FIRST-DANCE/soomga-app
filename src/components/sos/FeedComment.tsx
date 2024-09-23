// Libraries
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Modules
import Colors from "@/modules/Color";

// API
import { deleteSosComment } from "@/api/SosApi";

// Interfaces
import { SosCommentType } from "@/interface/Sos";
import React from "react";

const FeedComment = ({ comment }: { comment: SosCommentType }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteSosComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sos"] });
    },
  });

  const handleDelete = () => {
    Alert.alert("댓글 삭제", "삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      { text: "확인", onPress: () => mutate(comment.id) },
    ]);
  };

  return (
    <View onStartShouldSetResponder={() => true} style={styles.container}>
      <Image
        style={styles.profileImg}
        source={{
          uri: comment.member.avatar,
        }}
      />
      <View style={styles.commentBox}>
        <Text style={styles.commentProfile}>{comment.member.nickname}</Text>
        <Text style={styles.commentText}>{comment.content}</Text>
        {comment.member.id === 2 && (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FeedComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginTop: 5,
  },
  commentBox: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 15,
    flex: 1,
  },
  commentProfile: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    marginRight: 10,
  },
});
