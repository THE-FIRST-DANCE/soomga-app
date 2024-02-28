import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  "태그 편집": undefined;
  "여행 일정": undefined;
  "Email & Password": undefined;
  "Nickname & Gender": undefined;
  "Tags Select": undefined;
};

export type MyNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
