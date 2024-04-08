import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import React, { useState } from "react";
import { checkFollow } from "./GuideListPlan";
import { GuideType } from "@/data/guides";

function ToolContainer({ guide }: { guide: GuideType }) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {isModalVisible && (
        <View>
          <View style={styles.modalItems}>
            <Text style={styles.modalItemCaption}>
              {isFollowed ? "팔로우함" : "팔로우"}
            </Text>
            <Pressable
              style={styles.buttonContainer}
              onPress={() => {
                checkFollow({
                  isFollowed,
                  setIsFollowed,
                  guideName: guide.name,
                });
              }}
            >
              {isFollowed ? (
                <AntDesign name="heart" size={28} color={Colors.FEMALE_PINK} />
              ) : (
                <AntDesign name="hearto" size={28} color={Colors.BLACK} />
              )}
            </Pressable>
          </View>
          <View style={styles.modalItems}>
            <Text style={styles.modalItemCaption}>채팅하기</Text>
            <Pressable style={styles.buttonContainer}>
              <Ionicons
                name="chatbubbles-outline"
                size={28}
                color={Colors.BLACK}
              />
            </Pressable>
          </View>
          <View style={styles.modalItems}>
            <Text style={styles.modalItemCaption}>신고하기</Text>
            <Pressable style={styles.buttonContainer}>
              <Ionicons
                name="warning-outline"
                size={28}
                color={Colors.DANGER}
              />
            </Pressable>
          </View>
        </View>
      )}
      <Pressable
        style={[
          styles.buttonContainer,
          {
            alignContent: "flex-end",
            backgroundColor: isModalVisible
              ? Colors.BASKETBALL_ORANGE
              : Colors.WHITE,
          },
        ]}
        onPress={() => setIsModalVisible(!isModalVisible)}
      >
        {isModalVisible ? (
          <Ionicons name="close" size={45} color={Colors.WHITE} />
        ) : (
          <Feather name="menu" size={35} color={Colors.BLACK} />
        )}
      </Pressable>
    </View>
  );
}

export default ToolContainer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "flex-end",
  },
  modalItems: {
    width: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalItemCaption: {
    backgroundColor: Colors.GRAY_MEDIUM,
    textAlign: "center",
    width: 80,
    padding: 5,
    borderRadius: 10,
    fontSize: 20,
  },
  modalText: { fontSize: 20, marginRight: 15 },
  buttonContainer: {
    width: 60,
    height: 60,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderRadius: 100,
    elevation: 10,
  },
});
