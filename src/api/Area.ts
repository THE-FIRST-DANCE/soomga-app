import { api } from "./PlanApi";

export interface AreaType {
  id: number;
  name: string;
}

/* 전체 지역 조회 */
export const getAreas = async () => {
  try {
    const response = await api.get("areas");

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
