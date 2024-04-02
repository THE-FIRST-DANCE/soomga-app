import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import Colors from "@/modules/Color";

export function ToolModal() {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalItems}>
        <SimpleLineIcons name="user-follow" size={24} color={Colors.BLACK} />
        <Text style={styles.modalText}>팔로우</Text>
      </View>
      <View style={styles.modalItems}>
        <Ionicons name="chatbubbles-outline" size={24} color={Colors.BLACK} />
        <Text style={styles.modalText}>채팅하기</Text>
      </View>
      <View style={styles.modalItems}>
        <Ionicons name="warning-outline" size={24} color={Colors.DANGER} />
        <Text style={[styles.modalText, { color: Colors.DANGER }]}>
          신고하기
        </Text>
      </View>
    </View>
  );
}

function ToolButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Feather name="menu" size={35} color="black" />
    </Pressable>
  );
}

export default ToolButton;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 60,
    right: 40,
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalItems: {
    width: 110,
    marginVertical: 8,
    flexDirection: "row",
  },
  modalText: { fontSize: 20, marginLeft: 15 },
  buttonContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.BASKETBALL_ORANGE,
    borderRadius: 100,
    elevation: 10,
  },
});
