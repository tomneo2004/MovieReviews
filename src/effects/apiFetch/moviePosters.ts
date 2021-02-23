import useSWR from "swr";
import axios from "axios";
import { IMoviePosterData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/detail/movies/posters`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: IMoviePosterData[] = resp.data;
  return data;
};

/**
 * Side effect for fetching movie poster
 */
export function useMoviePosters(id: string): IFetchResponse<IMoviePosterData[]> {
  const { data, error } = useSWR(
    id ? () => `${apiRoute}?id=${id}` : null,
    fetcher
  );

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