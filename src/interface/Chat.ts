export interface Member {
  id: number;
  nickname: string;
  avatar?: string | null;
}

export interface Room {
  id: string;
  name: string;
  members: { member: Member }[];
  createdAt: string;
  deletedAt: string;
}
