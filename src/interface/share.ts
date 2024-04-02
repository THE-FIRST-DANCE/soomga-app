export enum AcessStatus {
  PUBLIC = "PUBLIC",
  GUIDES = "GUIDES",
  PRIVATE = "PRIVATE",
}

export enum BoardProcess {
  ACTIVE = "ACTIVE",
  PROCESSING = "PROCESSING",
  COMPLETE = "COMPLETE",
}

export interface AuthorType {
  id: number;
  avatar: string;
  birthdate: Date;
  nickname: string;
  email?: string;
}
