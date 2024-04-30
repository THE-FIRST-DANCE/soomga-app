// Libraries
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as Location from "expo-location";
import { useRecoilState } from "recoil";

// Modules
import Colors from "@/modules/Color";

// API
import { addSos, editSos } from "@/api/SosApi";

// Interfaces
import { SosStackParamList } from "@/stacks/SosStack";

// Components
import GoogleMap from "@/components/plan/GoogleMap";
import LoadingScreen from "@/components/Loading";
import Screen from "@/components/Screen";

// State
import { SosContent } from "@/state/store/SosRecoil";

const SosMapScreen = () => {
  const [location, setLocation] = useState<{
    coords: { latitude: number; longitude: number };
  } | null>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number }[]>([]);
  const [sosContent, setSosContent] = useRecoilState(SosContent);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<SosStackParamList>>();
  const queryClient = useQueryClient();

  type SosEditScreenRouteProp = RouteProp<SosStackParamList, "SosMapScreen">;
  const route = useRoute<SosEditScreenRouteProp>();
  const { boardId } = route.params;

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
      setLoading(false);
      Alert.alert("SOS가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["sos"] });
      navigation.navigate("SosScreen");
    },
    onError: () => {
      setLoading(false);
      Alert.alert("SOS 등록에 실패했습니다.");
    },
  });

  // 글 수정 뮤테이션
  const { mutate: editMutate } = useMutation({
    mutationFn: editSos,
    onSuccess: () => {
      setLoading(false);
      Alert.alert("SOS가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["sos"] });
      navigation.navigate("SosScreen");
    },
    onError: () => {
      setLoading(false);
      Alert.alert("SOS 수정에 실패했습니다.");
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

    if (boardId) {
      Alert.alert("SOS", "수정하시겠습니까?", [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: () => {
            setLoading(true);
            editMutate({
              sosId: boardId,
              updateSosDto: {
                content: sosContent.content,
                // status: sosContent.status,
                lat: marker[0].lat,
                lng: marker[0].lng,
                // authorId: 2,
              },
            });
          },
        },
      ]);
      return;
    }

    Alert.alert("SOS", "등록하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "확인",
        onPress: () => {
          setLoading(true);
          addMutate({
            content: sosContent.content,
            // status: sosContent.status,
            lat: marker[0].lat,
            lng: marker[0].lng,
            // authorId: 1,
          });
        },
      },
    ]);
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

      {loading && <LoadingScreen loading={loading} />}
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
