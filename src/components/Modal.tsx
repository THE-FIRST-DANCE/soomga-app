import Colors from "@/modules/Color";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  type?: "full" | "bottomTop" | "center" | "bottom";
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
        onPress={(event) => {
          if (event.target === event.currentTarget) {
            setVisible(false);
          }
        }}
      >
        <TouchableWithoutFeedback>
          <View
            style={
              type === "full"
                ? styles.modalFull
                : type === "bottom"
                ? styles.modalBottom
                : type === "bottomTop"
                ? styles.modalBottomTop
                : styles.modalCenter
            }
          >
            {type === "bottomTop" ||
              (type === "bottom" && (
                <TouchableOpacity
                  style={{ position: "absolute", top: 5, right: "50%" }}
                  onPress={() => setVisible(false)}
                >
                  <MaterialCommunityIcons
                    name="drag-horizontal-variant"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              ))}
            {children}
          </View>
        </TouchableWithoutFeedback>
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
  modalBottomTop: {
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
  modalBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
