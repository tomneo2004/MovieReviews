import useSWR from "swr";
import axios from "axios";
import { IVideoData, IVideosData } from "../../utils/api/model/apiModelTypes";
import { IFetchResponse } from "./fetchResponse";

const apiRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/detail/movies/videos`;

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: IVideosData = resp.data;
  return data.results;
};

/**
 * Side effect for fetching movie videos
 */
export function useMovieVideos(id: string): IFetchResponse<IVideoData[]> {
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
