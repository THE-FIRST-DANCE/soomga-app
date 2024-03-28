import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Screen from "@/components/Screen";
import GoogleMap from "@/components/plan/GoogleMap";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilState } from "recoil";
import { SosContent } from "@/state/store/SosRecoil";
import Colors from "@/modules/Color";
import { addSos } from "@/api/SosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SosStackParamList } from "@/stacks/SosStack";

const SosMapScreen = () => {
  const [location, setLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number }[]>([]);
  const [sosContent, setSosContent] = useRecoilState(SosContent);

  const navigation = useNavigation<NavigationProp<SosStackParamList>>();
  const queryClient = useQueryClient();

  // 위치 권한 요청 및 현재 위치 가져오기
  const ask = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 필요합니다.");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation({ coords: { latitude, longitude } });
      setMarker([{ lat: latitude, lng: longitude }]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ask();
  }, []);

  // 글 작성 뮤테이션
  const { mutate: addMutate } = useMutation({
    mutationFn: addSos,
    onSuccess: () => {
      Alert.alert("SOS가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["sos", 1] });
      navigation.navigate("SosScreen");
    },
    onError: () => {
      Alert.alert("SOS 등록에 실패했습니다.");
    },
  });

  // 글 작성
  const confirm = async () => {
    if (!marker.length) {
      Alert.alert("위치를 선택해주세요.");
      return;
    }

    setSosContent((prev) => ({
      ...prev,
      location: {
        latitude: marker[0].lat,
        longitude: marker[0].lng,
      },
    }));

    addMutate({
      content: sosContent.content,
      status: sosContent.status,
      lat: marker[0].lat,
      lng: marker[0].lng,
    });
  };

  return (
    <Screen
      right={
        <TouchableOpacity onPress={confirm} style={styles.nextButton}>
          <Text style={{ color: Colors.BLACK }}>작성</Text>
        </TouchableOpacity>
      }
    >
      <GoogleMap
        center={
          location
            ? {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
              }
            : undefined
        }
        setMarker={setMarker}
        marker={marker}
        moveMark={true}
      ></GoogleMap>
      <TouchableOpacity onPress={ask} style={styles.currentLocation}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.tooltip}>
        <MaterialIcons name="info" size={24} color="black" />
        <Text>마커를 길게 누르고 이동할 수 있습니다.</Text>
      </View>
    </Screen>
  );
};

export default SosMapScreen;

const styles = StyleSheet.create({
  currentLocation: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  nextButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: "center",
  },
});
