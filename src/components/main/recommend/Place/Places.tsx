import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

/* Pages */
import Place from "@placeMain/Place";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";

/* props */
type LocationType = {
  city: string | null;
  region: string | null;
  street: string | null;
};

function Places() {
  /* 임시 데이터 */
  const places = [
    {
      id: 1,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAzMjZfMjI2%2FMDAxNjc5ODM1Nzc1MTQ4.lwbY7Phtc5eS34iwee7ys6NI_c9jg1gBlpny1jh1--og.U-s_c4iHl97gt6jHHKD8QUVAssRb7yMJrg4GBW2cLHog.JPEG.minhae9191%2F%25B4%25EB%25B1%25B8_%25C0%25CC%25BF%25F9%25B5%25E5_%252813%2529.jpg&type=sc960_832",
      name: "이월드",
      lat: 35.853355,
      lng: 128.563884,
      distance: 18,
      address: "대구 달서구 두류공원로 200 이월드",
      stars: 4.55,
    },
    {
      id: 2,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEyMDhfMTI4%2FMDAxNzAyMDQ2OTgzNjM1.QzoYnDj0ODs2TcvkKSESQShoJAtTK0FKk0l8ukZo0K4g.c2fw7Lnxoh4KwShnRWUW1nDIDuAa_CcghRRe68cLIe8g.JPEG.hj2307%2F20231108_140643.jpg&type=sc960_832",
      name: "수성못",
      lat: 35.826554,
      lng: 128.621862,
      distance: 30,
      address: "대구 수성구 두산동 512",
      stars: 4.52,
    },
    {
      id: 3,
      photo:
        "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjFfMjI0%2FMDAxNjIxNTY5Mjg5OTA5.venyhr5c_DC9seqKqritutOqEP4v2idJpGhLGsWbjFkg.Gs3BLRbk8PDzZfD27nut9ryx4logRp2cDWtLf1mplLEg.JPEG.sh2j0725%2F20210519%25A3%25DF171637.jpg&type=sc960_832",
      name: "대구삼성라이온즈파크",
      lat: 35.841005,
      lng: 128.681996,
      distance: 32,
      address: "대구 수성구 야구전설로 1 대구삼성라이온즈파크",
      stars: 4.52,
    },
  ];

  /* 비동기 작업 진행 여부 변수 */
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* 위치 정보 저장 변수 */
  const [location, setLocation] = useState<LocationType>({
    city: "",
    region: "",
    street: "",
  });

  /* 위치 정보 가져오는 함수 */
  const getLocation = async () => {
    try {
      /* 전경 위치 권한 요청 */
      await Location.requestForegroundPermissionsAsync();

      /* 현재 위도, 경도 저장 */
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: 5,
      });

      /* 위도, 경도를 이용해 주소 저장 */
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );

      /* 비동기 작업 종료 */
      setIsLoading(false);

      /* 얻은 주소 정보 저장 */
      setLocation({
        city: location[0].city,
        region: location[0].region,
        street: location[0].street,
      });
    } catch (e) {
      Alert.alert("위치 정보를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>관광지 추천</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.moreButton}>
          <Text>+ 더보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
        <SimpleLineIcons
          name="location-pin"
          size={20}
          color="gray"
          style={{ marginLeft: 5 }}
        />
        <Text style={styles.location}>
          {/* 비동기 작업 진행중일 경우 메시지를 먼저 띄움 */}
          {isLoading
            ? "위치 정보 불러오는 중..."
            : `${location.region} ${location.city} ${location.street}`}
        </Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {places.map((place) => (
          <Place
            key={place.id}
            photo={place.photo}
            name={place.name}
            lat={place.lat}
            lng={place.lng}
            distance={place.distance}
            address={place.address}
            stars={place.stars}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Places;

const styles = StyleSheet.create({
  /* 컨테이너 스타일 */
  container: {
    marginTop: 30,
  },
  /* 더보기 버튼 스타일 */
  moreButton: {
    marginRight: 10,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: "#DC2626",
    backgroundColor: "white",
    elevation: 5,
  },
  /* 제목 스타일 */
  title: { fontWeight: "700", fontSize: 25, marginLeft: 5 },

  /* 위치 정보 컨테이너 스타일 */
  locationContainer: { flexDirection: "row", height: 30, marginTop: 10 },

  /* 위치 정보 텍스트 스타일 */
  location: { fontSize: 14, lineHeight: 20, marginLeft: 5 },
});
