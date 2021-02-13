import useSWR from "swr";
import axios from "axios";
import { ISearchMovieData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
  process.env.NEXT_PUBLIC_API_BASE_ROUTE || ""
}/api/search/movies`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: ISearchMovieData = resp.data;
  return data;
};

/**
 * Side effect for search movies by keywords
 * @param keyword search keyword
 * @param page page to display
 */
export function useSearchMovies(
  keyword: string = "",
  page: number = 1
): IFetchResponse<ISearchMovieData> {
  if (!page) page = 1;
  const { data, error } = useSWR(() => {
    if (!keyword) return null;
    return `${apiRoute}?query=${keyword}&page=${page}`;
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
