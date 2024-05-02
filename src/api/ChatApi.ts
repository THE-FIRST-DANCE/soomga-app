import { api } from "./PlanApi";
import { User } from "@/state/store/UserRecoil";

export interface ChatroomProps {
  id: number;
  name: string;
  createdAt: Date;
  deletedAt: Date;
  members: User[];
  messages: string[];
}

/* 채팅방 목록 가져오기 */
export const getChatList = async (
  setChatList: (newChatList: ChatroomProps[]) => void
) => {
  try {
    const response = await api.get("chat");
    setChatList(response.data);
  } catch (e) {
    console.error(e);
  }
};
