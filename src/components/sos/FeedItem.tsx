import Colors from "@/modules/Color";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { SosType } from "@/interface/Sos";
import useFormatDate from "@/hooks/useFormatDate";
import { EXPO_PUBLIC_GOOGLE_CLIENT_ID } from "@env";
import GlobalModal from "../Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSosComment, deleteSos, editSosProcess } from "@/api/SosApi";
import FeedComment from "./FeedComment";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SosStackParamList } from "@/stacks/SosStack";
import { BoardProcess } from "@/interface/share";
import FeedSettingModal from "./FeedSettingModal";

const FeedItem = ({ item }: { item: SosType }) => {
  const date = useFormatDate({ date: item.createdAt });
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openProcess, setOpenProcess] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();

  const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item.lat},${item.lng}&zoom=15&size=400x400&markers=color:red%7C${item.lat},${item.lng}&key=${EXPO_PUBLIC_GOOGLE_CLIENT_ID}`;
  const navigation = useNavigation<NavigationProp<SosStackParamList>>();

  const { mutate } = useMutation({
    mutationFn: addSosComment,
    onSuccess: () => {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["sos"] });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteSos,
    onSuccess: () => {
      Alert.alert("게시물 삭제", "게시물이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["sos"] });
    },
  });

  const { mutate: editProcessMutate } = useMutation({
    mutationFn: editSosProcess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sos"] });
    },
  });

  const handleProcess = (process: string) => {
    editProcessMutate({ sosId: item.id, process });
    setOpenProcess(false);
  };

  const handleComment = () => {
    const commentDto = {
      content: comment,
      memberId: 2,
      boardId: item.id,
    };

    mutate(commentDto);
  };

  const handleDelete = () => {
    Alert.alert("게시물 삭제", "삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      { text: "확인", onPress: () => deleteMutate(item.id) },
    ]);
  };

  const handleEdit = () => {
    setOpenSetting(false);
    navigation.navigate("SosCreateScreen", {
      content: item.content,
      boardId: item.id,
    });
  };

  return (
    <View style={styles.container}>
      {/* 프로필 */}
      <View style={styles.profile}>
        <Image
          style={styles.profileImg}
          source={{
            uri: item.author.avatar,
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{item.author.nickname}</Text>
          <Text style={styles.profileTime}>{date}</Text>
        </View>
      </View>

      {/* 설정 버튼 */}
      {item.author.id === 2 && (
        <TouchableOpacity
          style={styles.settingButton}
          onPress={() => setOpenSetting(true)}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} />

          <FeedSettingModal
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleProcess={handleProcess}
            openSetting={openSetting}
            setOpenSetting={setOpenSetting}
            openProcess={openProcess}
            setOpenProcess={setOpenProcess}
            BoardProcess={BoardProcess}
          />
        </TouchableOpacity>
      )}

      {/* 피드 내용 */}
      <View style={styles.feedContent}>
        <Text style={styles.feedContentText}>{item.content}</Text>
        <Image
          style={styles.feedContentImg}
          source={{
            uri: googleMapUrl,
          }}
        />
      </View>

      {/* 댓글, 공유 */}
      <View style={styles.feedTool}>
        <TouchableOpacity
          style={styles.comment}
          onPress={() => setOpenComment(true)}
        >
          <MaterialCommunityIcons name="comment-outline" size={24} />
          <Text style={{ marginLeft: 5 }}>
            {item?.comments?.length > 0 ? item.comments.length : 0}
          </Text>
        </TouchableOpacity>

        <GlobalModal
          type="bottom"
          visible={openComment}
          setVisible={setOpenComment}
          animation="slide"
        >
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Comments</Text>
              <TouchableOpacity onPress={() => setOpenComment(false)}>
                <MaterialCommunityIcons name="close" size={24} />
              </TouchableOpacity>
            </View>
            <View style={styles.commentList}>
              <FlatList
                data={item.comments}
                renderItem={({ item }) => <FeedComment comment={item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
            </View>
            <View style={styles.commentInput}>
              <MaterialCommunityIcons
                name="emoticon-outline"
                size={24}
                color={Colors.GRAY_MEDIUM}
              />
              <TextInput
                style={{ flex: 1, marginLeft: 10 }}
                placeholder="Enter your comment"
                multiline
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              <TouchableOpacity onPress={handleComment}>
                <MaterialCommunityIcons
                  name="send"
                  size={24}
                  color={Colors.PRIMARY}
                />
              </TouchableOpacity>
            </View>
          </View>
        </GlobalModal>

        <TouchableOpacity style={styles.share}>
          <MaterialCommunityIcons name="share-outline" size={24} />
          <Text style={{ marginLeft: 5 }}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* 채팅 버튼 */}
      <TouchableOpacity
        disabled={
          item.process === BoardProcess.COMPLETE ||
          item.process === BoardProcess.PROCESSING
        }
        style={[
          styles.chatButton,
          {
            backgroundColor:
              item.process === BoardProcess.COMPLETE
                ? Colors.GRAY_LIGHT
                : item.process === BoardProcess.PROCESSING
                ? Colors.GRAY_MEDIUM
                : Colors.PRIMARY,
          },
        ]}
      >
        <Text style={{ color: Colors.BLACK, fontSize: 16 }}>
          {item.process === BoardProcess.COMPLETE
            ? "Complete"
            : item.process === BoardProcess.PROCESSING
            ? "Processing"
            : "Chat"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    padding: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  profileInfo: {
    marginLeft: 10,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 16,
  },
  profileTime: {
    fontSize: 12,
    color: Colors.GRAY_MEDIUM,
  },
  feedContent: {
    marginTop: 15,
    gap: 10,
    marginBottom: 10,
  },
  feedContentText: {
    fontSize: 16,
  },
  feedContentImg: {
    width: "100%",
    height: 200,
    marginTop: 10,
    objectFit: "cover",
    borderRadius: 5,
  },
  feedTool: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatButton: {
    width: "100%",
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  commentContainer: {
    position: "relative",
    maxHeight: 500,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentList: {
    minHeight: 200,
    marginTop: 10,
    maxHeight: 300,
  },
  commentInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.GRAY_LIGHT,
    borderRadius: 10,
  },
  settingButton: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});
