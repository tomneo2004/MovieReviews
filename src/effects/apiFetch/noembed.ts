import useSWR from "swr";
import axios from "axios";
import { IFetchResponse } from "./fetchResponse";
import { INoembedData } from "../../utils/noembed/model/noembedModelType";

const apiRoute = "https://noembed.com/embed?url=";

const fetcher = async (url: string) => {
  const resp = await axios.get(url);
  const data: INoembedData = resp.data;
  return data;
};

/**
 * Side effect for fetching metadata of a video from Noembed
 * https://noembed.com/
 */
export function useNoembed(videoSrc: string): IFetchResponse<INoembedData> {
  const { data, error } = useSWR(() => {
    if (!videoSrc) return null;
    return `${apiRoute}${videoSrc}`;
  }, fetcher);

  const isLoading = !data && !error;
  // console.log(data);
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
