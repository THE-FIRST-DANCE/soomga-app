import { atom } from "recoil";

export interface AccessTokenAtom {
  token: boolean;
}

export const AccessTokenAtom = atom<AccessTokenAtom>({
  key: "Token",
  default: { token: false },
});
