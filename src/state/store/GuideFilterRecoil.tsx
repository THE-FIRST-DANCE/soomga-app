import { atom } from "recoil";

export const ageRangeState = atom<number[]>({
  key: "ageRangeState",
  default: [10, 70],
});

export const tempRangeState = atom<number[]>({
  key: "tempRangeState",
  default: [0, 100],
});

export const guideCountRangeState = atom<number[]>({
  key: "guideCountRangeState",
  default: [0, 100],
});

export const langsState = atom<string[]>({
  key: "langsState",
  default: [],
});

export const gendersState = atom<string[]>({
  key: "gendersState",
  default: [],
});

export const selectedRatingState = atom<number[]>({
  key: "selectedRatingState",
  default: [],
});
