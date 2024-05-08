import { api } from "./PlanApi";

export const getGuidesList = async () => {
  try {
    const response = await api.get("guides/search");

    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error(error);
  }
};
