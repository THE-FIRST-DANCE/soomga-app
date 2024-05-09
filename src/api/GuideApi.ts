import { api } from "./PlanApi";

/* 가이드 리스트 조회 */
export const getGuidesList = async () => {
  try {
    const response = await api.get("guides/search");

    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};

/* 가이드 리뷰 조회 */
export const getGuideReviews = async (guideId: number) => {
  try {
    const response = await api.get(`guides/${guideId}/reviews`, {
      params: {
        guideId,
      },
    });

    console.log(response.data.items, response.data.items.length);
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};
