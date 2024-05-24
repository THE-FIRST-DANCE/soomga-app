import Screen from "@/components/Screen";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/modules/Color";

function LangSettingScreen() {
  const [currentLang, setCurrentLang] = useState<string>("ko");

  const onChangeLang = (lang: string) => {
    setCurrentLang(lang);
  };

  const isKorean = currentLang === "ko";
  const isJapanese = currentLang === "jp";
  const isEnglish = currentLang === "en";

  return (
    <Screen title="언어 설정">
      <View>
        <TouchableOpacity
          style={styles.lang}
          onPress={() => onChangeLang("ko")}
        >
          <Text
            style={{
              ...styles.langText,
              color: isKorean ? Colors.GREEN : Colors.BLACK,
            }}
          >
            한국어
          </Text>
          {isKorean && (
            <AntDesign name="check" size={20} color={Colors.GREEN} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lang}
          onPress={() => onChangeLang("jp")}
        >
          <Text
            style={{
              ...styles.langText,
              color: isJapanese ? Colors.GREEN : Colors.BLACK,
            }}
          >
            日本語
          </Text>
          {isJapanese && (
            <AntDesign name="check" size={20} color={Colors.GREEN} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lang}
          onPress={() => onChangeLang("en")}
        >
          <Text
            style={{
              ...styles.langText,
              color: isEnglish ? Colors.GREEN : Colors.BLACK,
            }}
          >
            English
          </Text>
          {isEnglish && (
            <AntDesign name="check" size={20} color={Colors.GREEN} />
          )}
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

export default LangSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lang: {
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    padding: 20,
    flexDirection: "row",
  },
  langText: {
    fontSize: 20,
  },
});
