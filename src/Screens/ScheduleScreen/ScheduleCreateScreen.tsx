import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { ScheduleStackParamList } from "@/stacks/ScheduleStack";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalModal from "@/components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlanByUserId } from "@/api/PlanApi";
import { Plans } from "@/interface/Plan";
import { addEvent, updateEvent } from "@/api/EventApi";
import DateTimeSection from "@/components/schedule/DateTimeSection";
import PlanSection from "@/components/schedule/PlanSelectSection";

const ScheduleCreateScreen = () => {
  type PlanEditScreenRouteProp = RouteProp<
    ScheduleStackParamList,
    "ScheduleCreateScreen"
  >;
  const route = useRoute<PlanEditScreenRouteProp>();
  const { date, editEvent } = route.params;

  const navigate = useNavigation<NavigationProp<ScheduleStackParamList>>();

  const [title, setTitle] = useState<string>(editEvent?.title || "");
  const [allDay, setAllDay] = useState<boolean>(editEvent?.allDay || false);
  const [startDate, setStartDate] = useState<string>(
    editEvent ? format(editEvent.start, "yyyy-MM-dd") : date
  );
  const [endDate, setEndDate] = useState<string>(
    editEvent ? format(editEvent.end, "yyyy-MM-dd") : date
  );
  const [description, setDescription] = useState<string>(
    editEvent?.description || ""
  );
  const [startTime, setStartTime] = useState<string>(
    editEvent ? format(editEvent.start, "hh:mmaaaaa'm'") : "00:00am"
  );
  const [endTime, setEndTime] = useState<string>(
    editEvent ? format(editEvent.end, "hh:mmaaaaa'm'") : "23:30pm"
  );

  const [isAlramModalVisible, setAlramModalVisible] = useState(false);
  const [alramList, setAlramList] = useState<string[]>([]);

  const [planList, setPlanList] = useState<Plans[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plans | null>(null);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlanByUserId(1),
  });

  useEffect(() => {
    if (data) {
      setPlanList(data);
    }
  }, [data]);

  const { mutate: addMutate } = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      navigate.navigate("ScheduleScreen");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      navigate.navigate("ScheduleScreen");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const onEventAddHandler = useCallback(() => {
    if (!allDay) {
      startTime > endTime &&
        setStartTime(format(new Date(endDate), "hh:mmaaaaa'm'"));
    }

    if (selectedPlan) {
      const start = Number(format(startDate, "MMdd"));
      const end = Number(format(endDate, "MMdd"));

      if (end < start) {
        const endOfYear = Number(format(endDate, "yyyy")) + 1;
        const endOfMonth = Number(format(endDate, "MM"));
        const endOfMonthDays = new Date(endOfYear, endOfMonth, 0).getDate();
        const endDay = endOfMonthDays - start + end + 1;

        if (selectedPlan.period > endDay) {
          return;
        }
      } else {
        if (selectedPlan.period > end - start + 1) {
          return;
        }
      }
    }

    console.log(startTime);

    const formatTime = (time: string) => {
      const timeArr = time.split(":");
      const hour = Number(timeArr[0]);
      const minute = Number(timeArr[1].slice(0, 2));

      if (timeArr[1].slice(2) === "pm") {
        return (
          (hour + 12).toString().padStart(2, "0") +
          ":" +
          minute.toString().padStart(2, "0")
        );
      }

      return (
        hour.toString().padStart(2, "0") +
        ":" +
        minute.toString().padStart(2, "0")
      );
    };

    const formatStart =
      format(startDate, "yyyy-MM-dd") + "T" + formatTime(startTime);
    const formatEnd = format(endDate, "yyyy-MM-dd") + "T" + formatTime(endTime);

    const data = {
      memberId: 1, // TODO: 로그인 정보로 대체
      title,
      start: formatStart,
      end: formatEnd,
      allDay,
      description,
      planId: selectedPlan?.id,
    };

    if (editEvent) {
      updateMutate({ id: editEvent.id, data });
      return;
    }

    addMutate(data);
  }, [
    allDay,
    startTime,
    endTime,
    selectedPlan,
    startDate,
    endDate,
    title,
    description,
    editEvent,
    navigate,
  ]);

  return (
    <Screen>
      <View style={styles.Conatiner}>
        <TextInput
          style={styles.TitleInput}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />

        {/* 시간 설정 섹션 */}
        <DateTimeSection
          allDay={allDay}
          setAllDay={setAllDay}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        {/* 알림 추가 섹션 */}
        <View style={styles.Section}>
          <View style={styles.IconText}>
            <MaterialCommunityIcons name="alarm-plus" size={24} color="black" />
            <TouchableOpacity
              onPress={() => {
                setAlramModalVisible(true);
              }}
            >
              <Text style={styles.DateText}>알림 추가</Text>
            </TouchableOpacity>
          </View>
          <GlobalModal
            visible={isAlramModalVisible}
            setVisible={setAlramModalVisible}
            type="center"
          >
            <View
              style={{
                width: "100%",
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 15,
                position: "relative",
              }}
            >
              <Text>알림 추가</Text>
            </View>
          </GlobalModal>
        </View>

        {/* 글 작성 */}
        <View style={styles.Section}>
          <View style={styles.IconText}>
            <MaterialCommunityIcons name="text-long" size={24} color="black" />
            <TextInput
              style={{ flex: 1 }}
              placeholder="내용을 입력하세요"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* 플랜 등록 */}
        <PlanSection
          planList={planList}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      </View>

      {/* 취소, 저장 버튼 */}
      <View style={styles.Confirm}>
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}
          style={styles.ConfirmButton}
        >
          <Text style={styles.ConfirmText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEventAddHandler}
          style={styles.ConfirmButton}
        >
          <Text style={styles.ConfirmText}>저장</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default ScheduleCreateScreen;

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  Section: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_DARK,
    paddingVertical: 25,
    gap: 20,
  },
  TitleInput: {
    fontSize: 24,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_DARK,
    paddingVertical: 10,
    width: "100%",
  },
  IconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  NotIconText: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 44,
  },
  DateText: {
    fontSize: 20,
  },
  Confirm: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_DARK,
  },
  ConfirmButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.GRAY_MEDIUM,
    padding: 20,
  },
  ConfirmText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
