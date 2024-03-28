import { api } from "./PlanApi";

interface SosContent {
  content: string;
  lat: number;
  lng: number;
  status: string;
}

export const addSos = async (createSosDto: SosContent) => {
  const response = await api.post("/sos", createSosDto);

  return response.data;
};

export const getSos = async (page: number) => {
  const response = await api.get(`/sos/all?page=${page}`);

  return response.data;
};
