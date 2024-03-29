import { AuthorType } from "./share";

export interface SosType {
  id: number;
  content: string;
  lat: number;
  lng: number;
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
