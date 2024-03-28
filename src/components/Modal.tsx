import Colors from "@/modules/Color";
import { Modal, Pressable, StyleSheet, View } from "react-native";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  type?: "full" | "bottom" | "center";
  animation?: "fade" | "slide";
}

const GlobalModal = ({
  visible,
  setVisible,
  children,
  type,
  animation,
}: ModalProps) => {
  return (
    <Modal
      animationType={animation ? animation : "fade"}
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => setVisible(false)}
      >
        <View
          style={
            type === "full"
              ? styles.modalFull
              : type === "bottom"
              ? styles.modalBottom
              : styles.modalCenter
          }
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

export default GlobalModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalFull: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.WHITE,
    padding: 35,
  },
  modalBottom: {
    position: "absolute",
    bottom: "5%",
    width: "95%",
    backgroundColor: Colors.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 20,
  },
  modalCenter: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
  },
});
