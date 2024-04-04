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
}

export interface tag {
  id: number;
  name: string;
}
