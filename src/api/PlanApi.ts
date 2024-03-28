import {
  GooglePlaceResponse,
  PlaceData,
  PlanListConfirm,
  Plans,
} from "@/interface/Plan";
import axios from "axios";
import { EXPO_PUBLIC_KAKAO_API } from "@env";

export const api = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});

export const getPlaceApi = async (category: string, region: string) => {
  try {
    const response = await api.get("places", {
      params: {
        category,
        region,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
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

export const getTransCoord = async (
  x: number,
  y: number
): Promise<{ x: number; y: number }> => {
  console.log(EXPO_PUBLIC_KAKAO_API);

  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/geo/transcoord.json",
    {
      params: {
        x: x,
        y: y,
        output_coord: "WCONGNAMUL",
        input_coord: "WGS84",
      },
      headers: {
        Authorization: `KakaoAK ${EXPO_PUBLIC_KAKAO_API}`,
      },
    }
  );

  return {
    x: response.data.documents[0].x,
    y: response.data.documents[0].y,
  };
};

export const getPlaceRouteEdit = async ({
  planList,
  transport,
}: PlanListConfirm) => {
  const data = {
    list: planList,
    transport,
  };

  const response = await api.post("plans/route/edit", data);

  return response.data;
};

export const savePlan = async (data: any) => {
  const response = await api.post("plans/save", data);

  return response.data;
};

export const getPlanList = async (authorId: number) => {
  const response = await api.get("plans", {
    params: {
      authorId,
    },
  });

  return response.data;
};

export const getPlanById = async (planId: number) => {
  const response = await api.get(`plans/${planId}`);

  return response.data;
};

export const getPlanByUserId = async (userId: number): Promise<Plans[]> => {
  const response = await api.get(`plans/user/${userId}`);

  return response.data;
};
