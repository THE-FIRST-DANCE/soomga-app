// Librairies
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UserRecoil } from "@/state/store/UserRecoil";
import { useRecoilValue } from "recoil";

// Components
import Screen from "@/components/Screen";

// Api
import { getTouristDetail, likeTourist } from "@/api/TouristApi";

// Interface
import { Tourist } from "@/interface/Tourist";
import { TouristStackParamList } from "@/stacks/TouristStack";

// Modules
import Colors from "@/modules/Color";
import useFormatDate from "@/hooks/useFormatDate";

const TouristDetailScreen = () => {
  const [article, setArticle] = useState<Tourist | null>(null);
  const formatDate = useFormatDate({
    date: article?.createdAt,
  });
  const user = useRecoilValue(UserRecoil);

  type TouristDetailScreenRouteProp = RouteProp<
    TouristStackParamList,
    "TouristDetailScreen"
  >;
  const route = useRoute<TouristDetailScreenRouteProp>();
  const { touristId } = route.params;
  const navigation = useNavigation<NavigationProp<TouristStackParamList>>();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["touristDetail", touristId],
    queryFn: () => getTouristDetail(touristId),
  });

  const { mutate: likeArticle } = useMutation({
    mutationFn: () => likeTourist(touristId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["touristDetail", touristId],
      });
    },
  });

  useEffect(() => {
    if (data) {
      setArticle(data);
    }
  }, [data]);

  return (
    <Screen title={article?.title}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/200/300" }}
        />
        <View style={styles.content}>
          <View style={styles.tags}>
            {article?.tags.map((tag) => (
              <View key={tag.tag.id} style={styles.tag}>
                <Text>{tag.tag.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>{article?.title}</Text>
          <View style={styles.profile}>
            <Image
              style={styles.profileImage}
              source={{
                uri: article?.author.avatar ?? "https://picsum.photos/200/300",
              }}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{article?.author.nickname}</Text>
              <Text style={styles.profileDate}>{formatDate}</Text>
            </View>
          </View>
          <Text style={styles.body}>{article?.content}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => likeArticle()} style={styles.icontext}>
          <View style={styles.footerIcon}>
            {article?.likes.some((like) => like.memberId === user.id) ? (
              <AntDesign name="heart" size={20} color={Colors.DANGER} />
            ) : (
              <AntDesign name="hearto" size={20} color={Colors.GRAY_DARK} />
            )}
          </View>
          <Text style={styles.footerText}>{article?._count.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TouristDetailCommentsScreen", {
              comments: article?.comments,
              touristId: touristId,
            })
          }
          style={styles.icontext}
        >
          <View style={styles.footerIcon}>
            <AntDesign name="message1" size={20} color={Colors.GRAY_DARK} />
          </View>
          <Text style={styles.footerText}>{article?._count.comments}</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default TouristDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 20,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  tag: {
    backgroundColor: Colors.GRAY_MEDIUM,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "bold",
  },
  profile: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  profileInfo: {
    gap: 5,
  },
  profileName: {
    fontWeight: "bold",
  },
  profileDate: {
    color: Colors.GRAY_DARK,
  },
  body: {
    fontSize: 20,
    marginTop: 40,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icontext: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    gap: 5,
  },
  footerIcon: {
    borderRadius: 5,
  },
  footerText: {
    color: Colors.GRAY_DARK,
  },
});
