import { AuthorType, BoardProcess } from "./share";

export interface SosType {
  id: number;
  content: string;
  lat: number;
  lng: number;
  process: BoardProcess;
  createdAt: Date;
  comments: SosCommentType[];
  author: AuthorType;
}

export interface SosCommentType {
  id: number;
  content: string;
  createdAt: Date;
  member: AuthorType;
}
