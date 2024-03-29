import { atom } from "recoil";

// 나이 선택 범위
export const AgeRangeState = atom<number[]>({
  key: "AgeRangeState",
  default: [10, 70],
});

// 온도 선택 범위
export const TempRangeState = atom<number[]>({
  key: "TempRangeState",
  default: [0, 100],
});

// 가이드 횟수 선택 범위
export const GuideCountRangeState = atom<number[]>({
  key: "GuideCountRangeState",
  default: [0, 100],
});

// 선택한 언어
export const LangsState = atom<string[]>({
  key: "LangsState",
  default: [],
});

export const IsLangsSelectedState = atom<boolean[]>({
  key: "IsLangsSelectedState",
  default: [true, false, false, false],
});

// 선택한 성별
export const GendersState = atom<string[]>({
  key: "GendersState",
  default: [],
});

export const IsGendersSelectedState = atom<boolean[]>({
  key: "IsGendersSelectedState",
  default: [true, false, false],
});

// 선택한 일본어 자격증
export const JpnCertificateState = atom<string[]>({
  key: "JpnCertificateState",
  default: [],
});

export const IsJpnCertificateSelectedState = atom<boolean[]>({
  key: "IsJpnCertificateSelectedState",
  default: [true, false, false, false, false, false],
});

// 선택한 영어 자격증
export const EngCertificateState = atom<string[]>({
  key: "EngCertificateState",
  default: [],
});

export const IsEngCertificateSelectedState = atom<boolean[]>({
  key: "IsEngCertificateSelectedState",
  default: [true, false, false, false, false, false],
});

// 선택한 별점
export const SelectedRatingState = atom<number[]>({
  key: "SelectedRatingState",
  default: [],
});

export const IsRatingSelectedState = atom<boolean[]>({
  key: "IsRatingSelectedState",
  default: [false, false, false, false, false],
});
