import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { executedActivity, getPlanWithDaySchedules } from "@/api/PlanApi";
import { PlanConfirmListItem } from "@/interface/Plan";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExecutePlanState, PlanStep } from "@/state/store/PlanRecoil";
import { ProgressBar } from "@/components/ProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlanExecuteScreen = () => {
  const [review, setReview] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<PlanConfirmListItem[]>([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [period, setPeriod] = useState<number>(1);

  const executePlanState = useRecoilValue(ExecutePlanState);
  const [currentStep, setCurrentStep] = useRecoilState(PlanStep);

  type PlanEditScreenRouteProp = RouteProp<
    PlanStackParamList,
    "PlanExecuteScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();
  const { planId } = route.params; // 여행 정보

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission?.granted) {
        Alert.alert("사진을 업로드하려면 권한이 필요합니다.");
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      return null;
    }

    setImages([...images, result.assets[0].uri]);
  };

  const { data } = useQuery({
    queryKey: ["planschedule", planId],
    queryFn: () => getPlanWithDaySchedules(Number(planId), period),
  });

  const { mutate: executeSchedule } = useMutation({
    mutationFn: executedActivity,
    onSuccess: async () => {
      setImages([]);
      setReview("");
      if (currentStep < schedules.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await AsyncStorage.removeItem("executedPlan");
        navigation.navigate("PlanDetailScreen", {
          planId: planId,
        });
      }
    },
  });

  const handleNext = () => {
    executeSchedule({
      executedPlanId: executePlanState.executePlanId as number,
      scheduleId: schedules[currentStep - 1].id,
      memberId: 2,
      note: review,
      photos: images,
    });
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (data) {
      setSchedules(data.daySchedules[0].schedules);
    }
  }, [data]);

  return (
    <Screen title="일정 실행">
      {/* 일정 실행 화면 */}
      <ScrollView style={styles.container}>
        <ProgressBar
          totalStep={schedules.length - 1}
          currentStep={currentStep}
        />

        <Image
          src={schedules[currentStep - 1]?.item.photo}
          style={styles.placeImage}
        />
        <Text style={styles.placeName}>
          {schedules[currentStep - 1]?.item.name}
        </Text>

        <Text style={styles.sectionName}>사진 선택</Text>
        <TouchableOpacity style={styles.sectionImg} onPress={uploadImage}>
          <Text style={{ color: Colors.GRAY_DARK }}>사진 업로드</Text>
          <MaterialIcons
            name="add-photo-alternate"
            style={{ marginLeft: "auto" }}
            size={24}
            color={Colors.GRAY_DARK}
          />
        </TouchableOpacity>
        {images.map((image, index) => (
          <Image key={index} src={image} style={styles.sectionImg} />
        ))}

        <Text style={styles.sectionName}>리뷰 작성</Text>
        <TextInput
          style={styles.sectionReviewInput}
          placeholder="리뷰를 작성해주세요."
          multiline
          value={review}
          onChangeText={setReview}
        />

        <View style={styles.buttonWrap}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: Colors.GRAY_MEDIUM,
              },
            ]}
            onPress={handlePrev}
          >
            <Text style={{ color: Colors.BLACK }}>이전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "transparent",
                borderWidth: 1,
              },
            ]}
          >
            <Text style={{ color: Colors.BLACK }}>다음 경로</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={{ color: Colors.BLACK }}>다음</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default PlanExecuteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  placeImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  ProgressBar: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.GRAY_LIGHT,
    marginTop: 10,
  },

  placeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.BLACK,
    textAlign: "center",
    marginTop: 10,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK,
    marginTop: 30,
  },
  sectionImg: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  sectionReviewInput: {
    width: "100%",
    height: 100,
    padding: 10,
    paddingTop: 10,
    borderRadius: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: Colors.GRAY_MEDIUM,
    marginTop: 10,
  },
  buttonWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    width: "30%",
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
});
