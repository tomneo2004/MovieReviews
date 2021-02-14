import useSWR from "swr";
import axios from "axios";
import { IMovieData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/popular/movies`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: IMovieData[] = resp.data.results;
  return data;
};

/**
 * Side effect for fetching popular movies
 */
export function usePopularMovies(): IFetchResponse<IMovieData[]> {
  const { data, error } = useSWR(apiRoute, fetcher);

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
