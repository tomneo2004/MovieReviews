import { useSWRInfinite } from "swr";
import axios from "axios";
import { IMovieReviewsData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/detail/movies/reviews`;

const fetcher = async (url: string) => {
  try {
    const resp = await axios.get(url);
    const data: IMovieReviewsData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export interface IFetchPageResponse extends IFetchResponse<IMovieReviewsData> {
  size: number;
  setSize: (
    size: number | ((size: number) => number)
  ) => Promise<any[] | undefined>;
}

/**
 * Side effect for fetching reviews for movies
 */
export function useMovieReviews(id: string): IFetchPageResponse {
  const response = useSWRInfinite(
    (pageIndex: number, previousData: IMovieReviewsData) => {
      if ((previousData && !previousData.results.length) || !id) return null;

      return `${apiRoute}?id=${id}&page=${pageIndex + 1}`;
    },
    fetcher
  );

  function transformData(pages: IMovieReviewsData[]) {
    if (!pages || !pages.length) return undefined;

    let transformed: IMovieReviewsData = {
      id: 0,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    };

    for (let i = 0; i < pages.length; i++) {
      const { results, ...rest } = pages[i];
      transformed = {
        ...transformed,
        results: transformed.results.concat(results),
        ...rest,
      };
    }

    return transformed;
  }

  const isInitialLoading = !response.data && !response.error;
  const isLoading =
    isInitialLoading ||
    (response.size > 0 &&
      response.data &&
      typeof response.data[response.size - 1] === "undefined");

  return {
    data: transformData(response.data),
    error: response.error,
    size: response.size,
    setSize: response.setSize,
    isLoading,
  };
}
