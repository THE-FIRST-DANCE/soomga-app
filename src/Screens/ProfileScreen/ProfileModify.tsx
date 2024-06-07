import Screen from "@/components/Screen";
import Colors from "@/modules/Color";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles as tagStyle } from "@/components/main/Tags";
import { AreaType, getAreas } from "@/api/Area";

function ProfileModify() {
  const [areas, setAreas] = useState<AreaType[]>([]);

  const [birthDate, setBirthDate] = useState();

  useEffect(() => {
    const getAreasData = async () => {
      try {
        const areas = await getAreas();
        setAreas(areas);
      } catch (error) {
        console.error(error);
      }
    };

    getAreasData();
  }, []);

  return (
    <Screen title="프로필 수정">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputContainer}>
          <Text style={styles.caption}>이메일</Text>
          <TextInput style={styles.input} placeholder="test1@gmail.com" />
          <TouchableOpacity style={styles.modifyButton} activeOpacity={0.6}>
            <Text style={{ fontSize: 20 }}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.caption}>생년월일</Text>
          <View style={styles.input} />
          <TouchableOpacity style={styles.modifyButton} activeOpacity={0.6}>
            <Text style={{ fontSize: 20 }}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.caption}>비밀번호</Text>
          <TextInput style={styles.input} placeholder="기존 비밀번호" />
          <TextInput style={styles.input} placeholder="새로운 비밀번호" />
          <TextInput style={styles.input} placeholder="비밀번호 확인" />
          <TouchableOpacity style={styles.modifyButton} activeOpacity={0.6}>
            <Text style={{ fontSize: 20 }}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.caption}>활동 지역</Text>
          <View style={styles.selectItemContainer}>
            {areas.map((area, index) => (
              <View key={index} style={styles.selectItem}>
                <Text>{area.name}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.modifyButton} activeOpacity={0.6}>
            <Text style={{ fontSize: 20 }}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.caption}>사용 언어</Text>
          <View style={styles.selectItemContainer}>
            {["한국어", "English", "日本語"].map((lang, index) => (
              <View key={index} style={styles.selectItem}>
                <Text>{lang}</Text>
              </View>
            ))}
          </View>
          <View
            style={{ ...styles.selectItemContainer, flexDirection: "column" }}
          >
            <Text style={styles.caption}>日本語 🇯🇵</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["N1", "N2", "N3", "N4", "N5"].map((lang, index) => (
                <View key={index} style={styles.selectItem}>
                  <Text>{lang}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.caption}>English 🇬🇧</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["900 >", "800 >", "700 >", "600 >", "< 600"].map(
                (lang, index) => (
                  <View key={index} style={styles.selectItem}>
                    <Text>{lang}</Text>
                  </View>
                )
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.modifyButton} activeOpacity={0.6}>
            <Text style={{ fontSize: 20 }}>수정</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

export default ProfileModify;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "5%",
  },
  inputContainer: {
    marginVertical: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BLACK,
    padding: 15,
  },
  modifyButton: {
    height: 50,
    marginVertical: 5,
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  selectItemContainer: {
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BLACK,
    padding: 15,
    height: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectItem: {
    ...tagStyle.tag,
    width: 70,
    alignItems: "center",
    marginVertical: 5,
  },
});
