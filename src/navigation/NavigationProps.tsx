import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Test: undefined;
  "태그 편집": undefined;
  "여행 일정": undefined;
  "Email & Password": undefined;
  "Nickname & Gender": {
    data: {
      email: string;
      password: string;
      passwordConfirm: string;
    };
  };
  "Tags Select": {
    data: {
      email: string;
      nickname: string;
      password: string;
      passwordConfirm: string;
      birthDate: string;
    };
  };
};

export type MyNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
