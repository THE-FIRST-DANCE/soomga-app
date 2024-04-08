import { atom } from "recoil";

export interface User {
  id: number | null;
  nickname: string;
  email: string;
  avatar: string;
}

export const UserRecoil = atom<User>({
  key: "user",
  default: {
    id: null,
    nickname: "",
    email: "",
    avatar: "",
  },
});
