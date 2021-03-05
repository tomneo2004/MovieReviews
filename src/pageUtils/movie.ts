import axios from "axios";
import {
  IMovieDetailData,
  IRecommendationMoviesData,
  ISimilarMoviesData,
  IWatchProviderData,
} from "../utils/api/model/apiModelTypes";

export interface IPageProps {
  movieId: string;
  movieDetail: IMovieDetailData;
  recommendations: IRecommendationMoviesData;
  similars: ISimilarMoviesData;
  watchProviders: IWatchProviderData;
  error: any;
}

const apiMovieDetailRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/detail/movies`;

const apiRecommendationMovieRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/recommendation/movies`;

const apiSimilarMovieRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/similar/movies`;

const apiWatchProviderRoute = `${
  process.env.NEXT_PUBLIC_WEBSITE_ROUTE || ""
}/api/watchProvider/movies`;

export const fetchMovieDetail = async (movieId: string) => {
  try {
    const resp = await axios.get(`${apiMovieDetailRoute}?id=${movieId}`);
    const data: IMovieDetailData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchRecommendations = async (movieId: string) => {
  try {
    const resp = await axios.get(
      `${apiRecommendationMovieRoute}?id=${movieId}`
    );
    const data: IRecommendationMoviesData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchSimilars = async (movieId: string) => {
  try {
    const resp = await axios.get(`${apiSimilarMovieRoute}?id=${movieId}`);
    const data: ISimilarMoviesData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchWatchProvider = async (movieId: string) => {
  try {
    const resp = await axios.get(`${apiWatchProviderRoute}?id=${movieId}`);
    const data: IWatchProviderData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export {};
