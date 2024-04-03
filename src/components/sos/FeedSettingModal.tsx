import GlobalModal from "../Modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/modules/Color";

interface FeedSettingModalProps {
  handleEdit: () => void;
  handleDelete: () => void;
  handleProcess: (process: string) => void;
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  openProcess: boolean;
  setOpenProcess: React.Dispatch<React.SetStateAction<boolean>>;
  BoardProcess: any;
}

const FeedSettingModal = ({
  handleEdit,
  handleDelete,
  handleProcess,
  openSetting,
  setOpenSetting,
  openProcess,
  setOpenProcess,
  BoardProcess,
}: FeedSettingModalProps) => {
  return (
    <GlobalModal
      type="bottom"
      animation="slide"
      visible={openSetting}
      setVisible={setOpenSetting}
    >
      <View style={styles.settingModal}>
        <TouchableOpacity onPress={handleEdit} style={styles.iconText}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={32}
            color={Colors.GRAY_DARK}
          />
          <Text style={styles.settingText}>수정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.iconText}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={32}
            color={Colors.DANGER}
          />
          <Text
            style={[
              styles.settingText,
              {
                color: Colors.DANGER,
              },
            ]}
          >
            게시물 삭제
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOpenProcess(true);
          }}
          style={styles.iconText}
        >
          <MaterialCommunityIcons
            name="earth"
            size={32}
            color={Colors.GRAY_DARK}
          />
          <Text style={styles.settingText}>상태 변경하기</Text>
        </TouchableOpacity>

        {/* 상태 변경 모달 */}
        <GlobalModal
          type="bottom"
          animation="slide"
          visible={openProcess}
          setVisible={setOpenProcess}
        >
          <View style={styles.settingModal}>
            <TouchableOpacity
              onPress={() => handleProcess(BoardProcess.ACTIVE)}
              style={styles.process}
            >
              <Text style={styles.processText}>대기중</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleProcess(BoardProcess.PROCESSING)}
              style={styles.process}
            >
              <Text style={styles.processText}>진행중</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleProcess(BoardProcess.COMPLETE)}
              style={styles.process}
            >
              <Text
                style={[
                  styles.processText,
                  {
                    color: Colors.GREEN,
                  },
                ]}
              >
                완료
              </Text>
            </TouchableOpacity>
          </View>
        </GlobalModal>
      </View>
    </GlobalModal>
  );
};

export default FeedSettingModal;

const styles = StyleSheet.create({
  settingModal: {
    position: "relative",
    minHeight: 100,
    padding: 10,
    gap: 20,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  settingText: {
    fontSize: 18,
  },
  process: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY_MEDIUM,
  },
  processText: {
    fontSize: 20,
  },
});
