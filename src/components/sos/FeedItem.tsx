import Colors from "@/modules/Color";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SosType } from "@/interface/Sos";
import useFormatDate from "@/hooks/useFormatDate";
import { EXPO_PUBLIC_GOOGLE_CLIENT_ID } from "@env";

const FeedItem = ({ item }: { item: SosType }) => {
  const date = useFormatDate({ date: item.createdAt });

  const googleMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item.lat},${item.lng}&zoom=15&size=400x400&markers=color:red%7C${item.lat},${item.lng}&key=${EXPO_PUBLIC_GOOGLE_CLIENT_ID}`;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.profileImg}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>name</Text>
          <Text style={styles.profileTime}>{date}</Text>
        </View>
      </View>
      <View style={styles.feedContent}>
        <Text style={styles.feedContentText}>{item.content}</Text>
        <Image
          style={styles.feedContentImg}
          source={{
            uri: googleMapUrl,
          }}
        />
      </View>
      <View style={styles.feedTool}>
        <TouchableOpacity style={styles.comment}>
          <MaterialCommunityIcons name="comment-outline" size={24} />
          <Text style={{ marginLeft: 5 }}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.share}>
          <MaterialCommunityIcons name="share-outline" size={24} />
          <Text style={{ marginLeft: 5 }}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.chatButton}>
        <Text style={{ color: Colors.BLACK, fontSize: 16 }}>Chat</Text>
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
});
