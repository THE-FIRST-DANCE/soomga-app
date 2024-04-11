// Librairies
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// Modules
import Colors from "@/modules/Color";
import { Tourist } from "@/interface/Tourist";
import useFormatDate from "@/hooks/useFormatDate";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouristStackParamList } from "@/stacks/TouristStack";

const TouristArticle = ({ item }: { item: Tourist }) => {
  const naviagtion = useNavigation<NavigationProp<TouristStackParamList>>();

  const formatDate = useFormatDate({
    date: item.createdAt,
  });

  const handlePress = () => {
    naviagtion.navigate("TouristDetailScreen", {
      touristId: item.id,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image
        style={styles.articleImage}
        source={{ uri: "https://picsum.photos/200/300" }}
      />
      <View style={styles.articleInfo}>
        <Text style={styles.articleTitle}>
          {item.title.length > 20
            ? `${item.title.slice(0, 20)}...`
            : item.title}
        </Text>
        <View style={styles.articleRating}>
          <AntDesign name="star" size={18} color={Colors.PRIMARY} />
          <Text style={styles.articleRatingText}>4.5</Text>
          <Text style={styles.articleRatingValue}>(100 reviews)</Text>
        </View>
        <View style={styles.tags}>
          {item.tags.map((tag) => (
            <View key={tag.tag.id} style={styles.tag}>
              <Text>{tag.tag.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.from}>
          <Text>From</Text>
          <Text style={styles.fromUser}>
            {item.author.nickname.length > 10
              ? `${item.author.nickname.slice(0, 10)}...`
              : item.author.nickname}
          </Text>
          <Text>·</Text>
          <Text style={styles.fromDate}>{formatDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TouristArticle;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  articleImage: {
    width: "100%",
    height: 170,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  articleInfo: {
    padding: 10,
    gap: 7,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  articleRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  articleRatingText: {
    fontSize: 15,
    color: Colors.PRIMARY,
  },
  articleRatingValue: {
    fontWeight: "bold",
    color: Colors.GRAY_DARK,
  },
  tags: {
    flexDirection: "row",
    gap: 5,
  },
  tag: {
    backgroundColor: Colors.GRAY_MEDIUM,
    padding: 5,
    borderRadius: 5,
  },
  from: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  fromUser: {
    fontWeight: "bold",
  },
  fromDate: {
    color: Colors.GRAY_DARK,
  },
});
