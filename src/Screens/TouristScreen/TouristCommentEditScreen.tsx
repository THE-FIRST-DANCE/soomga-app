import { editTouristComment } from "@/api/TouristApi";
import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { TouristStackParamList } from "@/stacks/TouristStack";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const TouristCommentEditScreen = () => {
  type TouristDetailScreenRouteProp = RouteProp<
    TouristStackParamList,
    "TouristCommentEditScreen"
  >;
  const route = useRoute<TouristDetailScreenRouteProp>();
  const { comment, commentId, touristId } = route.params;
  const navigation = useNavigation<NavigationProp<TouristStackParamList>>();

  const [newComment, setComment] = React.useState<string>(comment);
  const queryClient = useQueryClient();

  const { mutate: editComment } = useMutation({
    mutationFn: () => editTouristComment(commentId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["touristComments", touristId],
      });
      navigation.goBack();
    },
  });

  const handleEditComment = () => {
    Alert.alert("댓글을 수정하시겠습니까?", "", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          editComment();
        },
      },
    ]);
  };

  return (
    <Screen
      title="댓글 수정"
      right={
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={handleEditComment}
        >
          <Text style={styles.rightText}>완료</Text>
        </TouchableOpacity>
      }
    >
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="댓글을 입력해주세요."
          style={styles.commentInput}
          value={newComment}
          onChangeText={setComment}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default TouristCommentEditScreen;

const styles = StyleSheet.create({
  rightText: {
    color: Colors.BLUE,
    fontSize: 16,
  },
  commentInput: {
    padding: 20,
    fontSize: 16,
  },
});
