import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import GlobalModal from "@/components/Modal";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/modules/Color";
import ServiceProposal from "./ServiceProposal";

interface ChatServiceModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export interface ServiceProps {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

function ChatReservationModal({ visible, setVisible }: ChatServiceModalProps) {
  const images = [
    {
      id: 1,
      uri: "https://cdn.pixabay.com/photo/2023/02/11/13/43/building-7782841_1280.jpg",
    },
    {
      id: 2,
      uri: "https://cdn.pixabay.com/photo/2016/01/19/14/25/pavilion-1148883_1280.jpg",
    },
    {
      id: 3,
      uri: "https://cdn.pixabay.com/photo/2022/08/05/05/59/korea-7366036_1280.jpg",
    },
    {
      id: 4,
      uri: "https://cdn.pixabay.com/photo/2016/10/17/07/53/busan-night-scene-1747130_1280.jpg",
    },
    {
      id: 5,
      uri: "https://cdn.pixabay.com/photo/2021/10/09/07/37/maisan-provincial-park-6693310_1280.jpg",
    },
  ];

  const [services, setServices] = useState<ServiceProps[]>([
    {
      id: 1,
      image: images[0].uri,
      title: "서비스 1",
      price: 10000,
      description:
        "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K",
    },
    {
      id: 2,
      image: images[1].uri,
      title: "서비스 2",
      price: 20000,
      description:
        "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K",
    },
    {
      id: 3,
      image: images[2].uri,
      title: "서비스 3",
      price: 30000,
      description:
        "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K",
    },
    {
      id: 4,
      image: images[3].uri,
      title: "서비스 4",
      price: 40000,
      description:
        "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K",
    },
    {
      id: 5,
      image: images[4].uri,
      title: "서비스 5",
      price: 50000,
      description:
        "韓国在住約10年になります。代行のご依頼500件以上、ご不満だったという評価は受けたことがありません♡日本・韓国でネットショップ経営中です。購入代行、仕入れ代行、予約代行、サイン会・ヨントン応募、K-pop、ショッピング、カフェ、観光、どれも得意です！韓国ソウル・ソウル郊外の現地人向けカフェやグルメ店を訪れるのが趣味です。旅行者向けよりは現地で人気のホットプレイスを探して回っています。オンラインショップを運営しているので、商品購入代行など、お任せください！特技は最低価格を探すことです^^ドライブが趣味ですので、送迎などもお任せください。",
    },
  ]);
  const [selectedService, setSelectedService] = useState<ServiceProps>({
    id: 0,
    image: "",
    title: "",
    price: 0,
    description: "",
  });

  const screenWidth = Dimensions.get("window").width;
  const serviceSelectXOffset = useRef(new Animated.Value(0)).current;
  const dateSelectXOffset = useRef(new Animated.Value(screenWidth)).current;

  const handleSelectService = () => {
    Animated.timing(serviceSelectXOffset, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(dateSelectXOffset, {
      toValue: -screenWidth + 70,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <GlobalModal
      animation="slide"
      type="full"
      visible={visible}
      setVisible={setVisible}
    >
      <AntDesign
        name="close"
        size={30}
        color="black"
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      />

      <Text style={{ fontSize: 30, fontWeight: "bold" }}>서비스 제안</Text>
      <View style={{ width: "200%", flexDirection: "row" }}>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: serviceSelectXOffset }],
          }}
        >
          <View style={{ marginTop: 20 }}>
            <FlatList
              contentContainerStyle={styles.serviceList}
              data={services}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.service}
                  onPress={() => {
                    handleSelectService();
                    setSelectedService(item);
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      flex: 0.4,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  />
                  <View style={{ flex: 1, padding: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                      <Text style={styles.price}>￦{item.price}</Text>
                    </View>
                    <Text
                      style={{ fontSize: 10, flexWrap: "wrap", marginTop: 5 }}
                    >
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: dateSelectXOffset }],
            marginTop: 20,
          }}
        >
          <ServiceProposal selectedService={selectedService} />
        </Animated.View>
      </View>
    </GlobalModal>
  );
}

export default ChatReservationModal;
const styles = StyleSheet.create({
  closeButton: {
    alignSelf: "flex-end",
  },
  serviceList: { gap: 20, marginTop: 10 },
  service: {
    flexDirection: "row",
    width: "100%",
    height: 90,
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  price: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginLeft: 5,
  },
  inputSection: {
    width: "100%",
    height: 50,
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.GRAY_MEDIUM,
    borderRadius: 10,
    justifyContent: "center",
  },
});
