// Libraries
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

// Components
import Screen from "@/components/Screen";

// Interface
import { TouristStackParamList } from "@/stacks/TouristStack";
import { SosCommentType } from "@/interface/Sos";

// Modules
import Colors from "@/modules/Color";
import useFormatDate from "@/hooks/useFormatDate";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTouristComment,
  getTouristComments,
  postTouristComment,
} from "@/api/TouristApi";
import { BoardComment } from "@/api/SosApi";
import { useRecoilValue } from "recoil";
import { UserRecoil } from "@/state/store/UserRecoil";
import GlobalModal from "@/components/Modal";

const TouristDetailCommentsScreen = () => {
  type TouristDetailScreenRouteProp = RouteProp<
    TouristStackParamList,
    "TouristDetailCommentsScreen"
  >;
  const route = useRoute<TouristDetailScreenRouteProp>();
  const navigate = useNavigation<NavigationProp<TouristStackParamList>>();
  const queryClient = useQueryClient();
  const user = useRecoilValue(UserRecoil);

  const { touristId } = route.params;

  const [comment, setComment] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { data: comments } = useQuery({
    queryKey: ["touristComments", touristId],
    queryFn: () => getTouristComments(touristId),
  });

  const { mutate: postComment } = useMutation({
    mutationFn: (data: BoardComment) => postTouristComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["touristComments", touristId],
      });
      setComment("");
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: (id: number) => deleteTouristComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["touristComments", touristId],
      });
    },
  });

  const postCommentHandler = () => {
    if (!comment) return;

    const data = {
      boardId: touristId,
      content: comment,
      memberId: 2,
    };

    postComment(data);
  };

  const deleteCommentHandler = (id: number) => {
    Alert.alert("댓글을 삭제하시겠습니까?", "", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: () => deleteComment(id),
      },
    ]);
  };

  const editHandler = (id: number, content: string) => {
    setModalVisible(false);
    navigate.navigate("TouristCommentEditScreen", {
      comment: content,
      commentId: id,
      touristId,
    });
  };

  const renderItem = (item: SosCommentType) => {
    const formatDate = useFormatDate({
      date: item.createdAt,
    });

    return (
      <View style={styles.comment}>
        <View style={styles.profile}>
          <Image
            source={{ uri: item.member.avatar }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{item.member.nickname}</Text>
        </View>
        <Text style={styles.content}>{item.content}</Text>
        <Text style={styles.date}>{formatDate}</Text>

        {item.member.id === user?.id && (
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.tool}
          >
            <Entypo name="dots-three-vertical" size={16} color="black" />
          </TouchableOpacity>
        )}

        <GlobalModal
          visible={modalVisible}
          setVisible={setModalVisible}
          animation="slide"
          type="bottom"
        >
          <TouchableOpacity
            style={[
              styles.toolItem,
              {
                borderTopWidth: 0,
              },
            ]}
            onPress={() => editHandler(item.id, item.content)}
          >
            <Text style={styles.toolText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteCommentHandler(item.id)}
            style={styles.toolItem}
          >
            <Text style={styles.toolText}>삭제</Text>
          </TouchableOpacity>
        </GlobalModal>
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <Text style={styles.title}>댓글 {comments?.length}개</Text>
          )}
          renderItem={({ item }) => renderItem(item)}
          style={{ flex: 1, padding: 20 }}
        />

        <KeyboardAvoidingView>
          <SafeAreaView edges={["bottom"]} style={styles.bottom}>
            <TextInput
              placeholder="댓글을 입력해주세요."
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={[
                styles.commentButton,
                {
                  opacity: comment ? 1 : 0.5,
                },
              ]}
              onPress={postCommentHandler}
            >
              <Text style={styles.commentButtonText}>등록</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Screen>
  );
};

export default TouristDetailCommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  comment: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_MEDIUM,
    paddingVertical: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  profileName: {
    marginLeft: 10,
    fontWeight: "bold",
  },
  content: {
    marginVertical: 10,
  },
  date: {
    color: Colors.GRAY_MEDIUM,
  },
  bottom: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_MEDIUM,
  },
  commentInput: {
    flex: 1,
  },
  commentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY_DARK,
    borderRadius: 10,
  },
  commentButtonText: {
    color: Colors.GRAY_DARK,
  },
  tool: {
    position: "absolute",
    top: 25,
    right: 20,
  },
  toolItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_MEDIUM,
  },
  toolText: {
    fontSize: 18,
  },
});
