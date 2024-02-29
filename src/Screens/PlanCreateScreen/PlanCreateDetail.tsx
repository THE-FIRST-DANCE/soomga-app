import Screen from "@/components/Screen";
import { provinces } from "@/data/region";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TravelSvg } from "./PlanCreateScreen";
import Colors from "@/modules/Color";
import { RadioButton } from "react-native-paper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlanStackParamList } from "@/stacks/PlanStack";
import { useSetRecoilState } from "recoil";
import { PlanInfo } from "@/state/store/PlanRecoil";

// 플랜 생성 상세 정보 작성 화면
const PlanCreateDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState(provinces);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectDirect, setSelectDirect] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(1);

  const periodOptions = [1, 2, 3, 0];

  const navigation = useNavigation<NavigationProp<PlanStackParamList>>();

  const setPlanInfo = useSetRecoilState(PlanInfo);

  const onChangeValue = (value: string | null) => {
    setValue(value || "");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onChangePeriod = (period: number) => () => {
    setSelectedPeriod(period);
    setSelectDirect(false);
  };

  const onChageDirect = (value: string) => {
    value.replace(/[^0-9]/g, "");
    setSelectedPeriod(parseInt(value));
  };

  const onPrev = () => {
    navigation.goBack();
  };

  const onNext = () => {
    if (!title || !value || !selectedPeriod) {
      Alert.alert("모든 항목을 입력해주세요");
      return;
    }

    setPlanInfo(() => ({
      title,
      province: provinces.find((p) => p.value === value)?.label || "",
      period: selectedPeriod,
      lat: provinces.find((p) => p.value === value)?.lat || 0,
      lng: provinces.find((p) => p.value === value)?.lng || 0,
    }));

    navigation.navigate("PlanPlaceSelectScreen");
  };

  return (
    <Screen title="플랜 생성">
      <View style={styles.container}>
        {/* 로고, 제목 */}
        <View style={styles.header}>
          <TravelSvg width={48} height={48} />
          <Text style={styles.headerText}>새로운 플랜</Text>
        </View>

        {/* 이름 입력 */}
        <View>
          <Text style={styles.inputTitle}>플랜 이름</Text>
          <TextInput
            style={styles.input}
            placeholder="플랜 이름을 입력해주세요"
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        {/* 여행지 선택 드롭다운 */}
        <View style={{ zIndex: 9999 }}>
          <Text style={styles.inputTitle}>여행지 선택</Text>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            value={value}
            itemKey="value"
            placeholder="여행지를 선택해주세요"
            setItems={setItems}
            setValue={setValue}
            onChangeValue={onChangeValue}
            style={styles.dropdownContainer}
            listItemContainerStyle={{
              backgroundColor: Colors.GRAY_LIGHT,
              zIndex: 1000,
            }}
          />
        </View>

        {/* 여행기간 */}
        <View>
          <Text style={styles.inputTitle}>여행기간</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.input}
          >
            <Text style={{ fontSize: 16 }}>
              {selectedPeriod === 0 ? "직접입력" : `${selectedPeriod}일`}
            </Text>
          </TouchableOpacity>
          {/* 여행 기간 모달 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  여행기간을 선택해주세요
                </Text>
              </View>
              {periodOptions.map((option) => (
                <View style={styles.optionButton} key={option}>
                  <Text style={styles.optionText}>
                    {option === 0 ? "직접입력" : `${option}일`}
                  </Text>
                  <RadioButton
                    value={option.toString()}
                    status={selectedPeriod === option ? "checked" : "unchecked"}
                    onPress={
                      option === 0
                        ? () => {
                            setSelectedPeriod(0);
                            setSelectDirect(true);
                          }
                        : onChangePeriod(option)
                    }
                  />
                </View>
              ))}
              <Button title="확인" onPress={closeModal} />
            </View>
          </Modal>
        </View>

        {
          // 여행기간 직접입력
          selectDirect && (
            <View>
              <Text style={styles.inputTitle}>직접입력</Text>
              <TextInput
                style={styles.input}
                placeholder="직접입력"
                onChangeText={onChageDirect}
                keyboardType="numeric"
              />
            </View>
          )
        }

        {/* 취소, 저장 */}
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors.GRAY_DARK }]}
            onPress={onPrev}
          >
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} style={styles.button}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default PlanCreateDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    justifyContent: "center",
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  dropdownContainer: {
    width: "100%",
    marginTop: 5,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.WHITE,
    padding: 35,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionButton: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 20,
  },
});
