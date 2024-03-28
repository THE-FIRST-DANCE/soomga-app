import { atom } from "recoil";

export interface SosContent {
  content: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const SosContent = atom<SosContent>({
  key: "sosContent",
  default: {
    content: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
});
