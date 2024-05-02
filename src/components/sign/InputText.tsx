import { View, TextInput, Text, StyleSheet } from "react-native";

/* props */
type InputTextType = {
  title: string;
  placeholder: string;
  style?: object;
  isPasswordVisible?: boolean;
  value: string;
  handler: {
    input: (value: string) => void;
  };
};

function InputText({
  title,
  placeholder,
  style,
  isPasswordVisible,
  value,
  handler,
}: InputTextType) {
  return (
    <View style={style}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.inputTexts}
        secureTextEntry={isPasswordVisible}
        onChangeText={handler.input}
        value={value}
      />
    </View>
  );
}

export default InputText;

const styles = StyleSheet.create({
  /* 입력창 스타일 */
  inputTexts: {
    width: "100%",
    height: 45,
    padding: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    fontSize: 18,
  },
});
