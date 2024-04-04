import { api } from "./PlanApi";

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
