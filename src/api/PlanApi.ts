import {
  GooglePlaceResponse,
  PlaceData,
  PlanListConfirm,
} from "@/interface/Plan";
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

export const getSearchPlaceGoogle = async (
  query: string,
  location: string
): Promise<GooglePlaceResponse> => {
  const response = await api.get("places/search", {
    params: {
      query,
      location,
    },
  });

  return response.data;
};

export const addPlaceApi = async (data: PlaceData) => {
  const response = await api.post("places/add", data);

  return response.data;
};

export const getPlaceRoute = async ({
  planList,
  transport,
}: PlanListConfirm) => {
  const data = {
    list: planList,
    transport,
  };

  const response = await api.post("plans/distance", data);

  return response.data;
};
