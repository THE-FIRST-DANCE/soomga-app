import { StyleSheet, Text, View } from "react-native";
import GlobalModal from "@/components/Modal";
import { Dispatch, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";

interface ChatServiceModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

function ChatReservationModal({ visible, setVisible }: ChatServiceModalProps) {
  return (
    <GlobalModal
      animation="slide"
      type="full"
      visible={visible}
      setVisible={setVisible}
    >
      <AntDesign
        name="close"
        size={30}
        color="black"
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      />
      <View>
        <Text>ChatReservationModal</Text>
      </View>
    </GlobalModal>
  );
}

export default ChatReservationModal;

const styles = StyleSheet.create({
  closeButton: {
    position: "absolute",
    top: 30,
    right: 30,
  },
});
