import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SosStackParamList } from "@/stacks/SosStack";
import * as ImagePicker from "expo-image-picker";
import { useSetRecoilState } from "recoil";
import { SosContent } from "@/state/store/SosRecoil";
import { Status } from "@/modules/Status";
import GlobalModal from "@/components/Modal";

const SosCreateScreen = () => {
  const [content, setContent] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [sosStatus, setSosStatus] = useState<string>("PUBLIC");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const setSosContent = useSetRecoilState(SosContent);

  const textInputRef = useRef<TextInput>(null);

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

    setImageUri(result.assets[0].uri);
  };

  const navigation = useNavigation<NavigationProp<SosStackParamList>>();
  const handleNext = () => {
    if (content.trim() === "") {
      Alert.alert("내용을 입력해주세요.");
      return;
    }

    setSosContent((prev) => ({
      ...prev,
      status: sosStatus,
      content,
    }));

    navigation.navigate("SosMapScreen");
  };

  return (
    <Screen
      right={
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={{ color: Colors.BLACK }}>다음</Text>
        </TouchableOpacity>
      }
    >
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          onFocus={() => textInputRef.current?.focus()}
          ref={textInputRef}
          value={content}
          onChangeText={setContent}
          placeholder="무슨 도움이 필요하신가요?"
          multiline
          textAlignVertical="top"
          style={{
            backgroundColor: Colors.GRAY_LIGHT,
            paddingTop: 20,
            padding: 20,
          }}
          focusable
        />
        {imageUri && (
          <View style={{ width: "100%", height: 300, position: "relative" }}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%", position: "absolute" }}
            />
            <TouchableOpacity
              onPress={() => setImageUri(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.statusBar}
        >
          {Status.find((item) => item.value === sosStatus) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image
                source={{
                  uri: Status.find((item) => item.value === sosStatus)?.icon,
                }}
                style={{ width: 24, height: 24 }}
              />
              <Text>
                {Status.find((item) => item.value === sosStatus)?.larvel}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <GlobalModal
          type="bottom"
          animation="slide"
          visible={modalVisible}
          setVisible={setModalVisible}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              게시물을 볼 수 있는 사람
            </Text>

            <Text
              style={{
                fontSize: 14,
                marginBottom: 10,
                color: Colors.GRAY_DARK,
              }}
            >
              이 게시물을 볼 수 있는 사람을 선택해주세요. 선택한 사람에게만
              게시물이 보여집니다.
            </Text>

            {Status.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSosStatus(item.value);
                  setModalVisible(false);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 20,
                }}
              >
                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={{ marginLeft: 10 }}>{item.larvel}</Text>
                {sosStatus === item.value && (
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
                    }}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </GlobalModal>

        <View style={styles.toolBar}>
          <TouchableOpacity onPress={uploadImage} style={{ marginRight: 10 }}>
            <Ionicons name="images-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default SosCreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 10,
    backgroundColor: Colors.GRAY_LIGHT,
  },
  nextButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    alignItems: "center",
  },
  toolBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_MEDIUM,
  },
  statusBar: {
    borderTopWidth: 1,
    borderTopColor: Colors.GRAY_MEDIUM,
    height: 40,
    justifyContent: "center",
    padding: 10,
  },
});
