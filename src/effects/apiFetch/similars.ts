import useSWR from "swr";
import axios from "axios";
import {ISimilarMoviesData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
    process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
  }/api/similar/movies`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: ISimilarMoviesData = resp.data;
  return data;
};

/**
 * Side effect for similar movies
 * @param id reference movie id
 */
export function useSimilars(
  id:string,
): IFetchResponse<ISimilarMoviesData> {
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