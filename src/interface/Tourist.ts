import { SosCommentType } from "./Sos";
import { AcessStatus, AuthorType } from "./share";

export interface Tourist {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  status: AcessStatus;
  tags: {
    tag: tag;
  }[];
  author: AuthorType;
  _count: {
    comments: number;
    likes: number;
  };
  likes: TouristLike[];
  comments: SosCommentType[];
}

export interface tag {
  id: number;
  name: string;
}

export interface TouristLike {
  memberId: number;
}
