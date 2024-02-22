import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

/* Pages */
import Places from "@recommend/Places";
import Regions from "@recommend/Regions";

/* vector-icons */
import { SimpleLineIcons } from "@expo/vector-icons";

/* 위치 정보 객체 타입 */
type LocationType = {
  city: string | null;
  region: string | null;
  street: string | null;
};

function Recommend() {
  /* 비동기 작업 진행 여부 변수 */
  const [isLoading, setIsLoading] = useState(true);

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
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>관광지 추천</Text>
        <TouchableOpacity
          onPress={() => console.log("More Button Pressed!")}
          style={styles.moreButton}
        >
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
      <Places />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>지역 추천</Text>
        <TouchableOpacity
          onPress={() => console.log("More Button Pressed!")}
          style={styles.moreButton}
        >
          <Text>+ 더보기</Text>
        </TouchableOpacity>
      </View>
      <Regions />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  /* 추천 전체 스타일 */
  container: {
    width: screenWidth - 30,
    marginTop: 20,
    marginHorizontal: 15,
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

export default Recommend;
