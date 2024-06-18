import { Room } from "@/interface/Chat";
import { api } from "./PlanApi";

/* 채팅방 목록 가져오기 */
export const getRooms = async () => {
  try {
    const res = await api.get<Room[]>("chat");
    return res.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
