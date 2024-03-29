export enum AcessStatus {
  PUBLIC = "PUBLIC",
  GUIDES = "GUIDES",
  PRIVATE = "PRIVATE",
}

export interface AuthorType {
  id: number;
  avatar: string;
  birthdate: Date;
  nickname: string;
  email?: string;
}
