import { atom } from "recoil";
import { Room } from "@/interface/Chat";

export const ChatList = atom<Room[]>({
  key: "chatList",
  default: [
    {
      id: "",
      name: "",
      members: [],
      createdAt: "",
      deletedAt: "",
    },
  ],
});
