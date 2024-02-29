import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: "row",
  },
  left: {
    flex: 1,
    justifyContent: "center",
  },
  center: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  body: {
    flex: 1,
  },
  backButtonIcon: {
    color: Colors.BLACK,
    fontSize: 20,
    marginLeft: 20,
  },
});

interface ScreenProps {
  title?: string;
  children?: React.ReactNode;
}

const Screen = ({ title, children }: ScreenProps) => {
  const { goBack, canGoBack } = useNavigation();
  const onPreeBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          {canGoBack() && (
            <TouchableOpacity onPress={onPreeBack}>
              <Ionicons
                name="chevron-back"
                style={styles.backButtonIcon}
                color={Colors.BLACK}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.right} />
      </View>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
