import { tokenApi } from "./Api";
import { api } from "./PlanApi";
import { BoardComment } from "./SosApi";

export const getTouristList = async ({
  pageParam,
  areas,
  sort,
}: {
  pageParam?: number | null;
  areas: number[];
  sort?: string;
}) => {
  const response = await api.get("/trips/find", {
    params: {
      cursor: pageParam,
      areas,
      sort,
    },
  });

  return response.data;
};

export const getTouristDetail = async (touristId: number) => {
  const response = await api.get(`/trips/${touristId}`);

  return response.data;
};

// 글 좋아요
export const likeTourist = async (id: number) => {
  const response = await tokenApi.post(`/trips/${id}/like`);

  return response.data;
};

// 댓글 불러오기
export const getTouristComments = async (id: number) => {
  const response = await api.get(`/trips/${id}/comment`);

  return response.data;
};

// 댓글 작성
export const postTouristComment = async (data: BoardComment) => {
  const { content, memberId, boardId } = data;
  const commentDto = {
    content,
    memberId,
  };
  const response = await api.post(`/trips/${boardId}/comment`, commentDto);

  return response.data;
};

// 댓글 삭제
export const deleteTouristComment = async (id: number) => {
  const response = await tokenApi.delete(`/trips/comment/${id}`);

  return response.data;
};

// 댓글 수정
export const editTouristComment = async (
  commentId: number,
  content: string
) => {
  const response = await tokenApi.patch(`/trips/comment/${commentId}`, {
    content,
  });

  return response.data;
};
