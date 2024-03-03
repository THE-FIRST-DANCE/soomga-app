import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export const getPlaceApi = async (category: string, region: string) => {
  const response = await api.get("places", {
    params: {
      category,
      region,
    },
  });

  return response.data;
};
