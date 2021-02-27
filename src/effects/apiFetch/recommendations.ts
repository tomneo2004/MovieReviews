import useSWR from "swr";
import axios from "axios";
import { IRecommendationMoviesData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
    process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
  }/api/recommendation/movies`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: IRecommendationMoviesData = resp.data;
  return data;
};

/**
 * Side effect for recommendation movies
 * @param id reference movie id
 */
export function useRecommendations(
  id:string,
): IFetchResponse<IRecommendationMoviesData> {
  const { data, error } = useSWR(() => {
    if (!id) return null;
    return `${apiRoute}?id=${id}`;
  }, fetcher);

  const isLoading = !data && !error;

  if (error) {
    console.log(error);
    return {
      data: null,
      error,
      isLoading,
    };
  }

  return {
    data,
    error: null,
    isLoading,
  };
}