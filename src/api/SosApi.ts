import { api } from "./PlanApi";

interface SosContent {
  content: string;
  lat: number;
  lng: number;
  status: string;
  authorId: number;
}

export interface BoardComment {
  content: string;
  memberId: number;
  boardId: number;
}

export const addSos = async (createSosDto: SosContent) => {
  const response = await api.post("/sos", createSosDto);

  return response.data;
};

export const getSos = async ({ pageParam }: { pageParam?: number | null }) => {
  const response = await api.get(`/sos/all`, {
    params: {
      cursor: pageParam,
    },
  });

  return response.data;
};

export const addSosComment = async (data: BoardComment) => {
  const { content, memberId, boardId } = data;
  const commentDto = {
    content,
    memberId,
  };

  const response = await api.post(`/sos/${boardId}/comment`, commentDto);

  return response.data;
};

export const editSos = async ({
  sosId,
  updateSosDto,
}: {
  sosId: number;
  updateSosDto: SosContent;
}) => {
  const response = await api.patch(`/sos/${sosId}`, updateSosDto);

  return response.data;
};

export const editSosProcess = async ({
  sosId,
  process,
}: {
  sosId: number;
  process: string;
}) => {
  const response = await api.patch(`/sos/${sosId}/process`, { process });

  return response.data;
};

export const deleteSos = async (sosId: number) => {
  const response = await api.delete(`/sos/${sosId}`);

  return response.data;
};

export const deleteSosComment = async (commentId: number) => {
  const response = await api.delete(`/sos/comment/${commentId}`);

  return response.data;
};
