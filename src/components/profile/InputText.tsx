import { View, TextInput, Text, StyleSheet } from "react-native";

/* props */
type InputTextType = {
  title: string;
  placeholder: string;
  style?: object;
  isPasswordVisible?: boolean;
  onChangeText?: (text: string) => void;
};

function InputText({
  title,
  placeholder,
  style,
  isPasswordVisible,
  onChangeText,
}: InputTextType) {
  return (
    <View style={style}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.inputTexts}
        secureTextEntry={isPasswordVisible}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  /* 입력창 스타일 */
  inputTexts: {
    width: 320,
    height: 45,
    padding: 5,
    marginTop: 3,
    borderBottomWidth: 1,
    fontSize: 18,
  },
});
