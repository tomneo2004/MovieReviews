import urljoin from "url-join";
import { buildAPIQuery, IParams, defaultParams } from "./queryHelper";

const imageAPI = "https://image.tmdb.org";
const movieAPI = "https://api.themoviedb.org";
const movieAPIVersion = "3";
const movieAPIKey = process.env.MOVIE_API_KEY;

/**
 *
 * @param imagePath image path
 * @param imageSize reference to https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export function buildImageQuery(imagePath: string, imageSize: string = "w200") {
  if (!imagePath) return "";

  const buildQuery = urljoin(imageAPI, "t", "p", imageSize, imagePath);

  return buildQuery;
}

/**
 * Get query for popular movie
 *
 * @param page default 1
 * @param lang  default en-US
 * @param region  default us
 */
export function getPouplarMoviesQuery(params: IParams = defaultParams) {
  const queryString = "/movie/popular";
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

const trendingMediaType: { [key: string]: boolean } = {
  all: true,
  movie: true,
  tv: true,
  person: true,
};
const trendingTimeWindow: { [key: string]: boolean } = {
  day: true,
  week: true,
};

/**
 * Get query for trending
 *
 * @param mediaType  all, movie, tv, person. default movie
 * @param timeWindow  day, week. deault day
 */
export function getTrendingQuery(
  mediaType: string = "movie",
  timeWindow: string = "day",
  params: IParams = defaultParams
) {
  if (!trendingMediaType[mediaType]) {
    throw Error(`${mediaType} was not match any of ${trendingMediaType}`);
  }
  if (!trendingTimeWindow[timeWindow]) {
    throw Error(`${timeWindow} was not match any of ${trendingTimeWindow}`);
  }

  const queryString = `/trending/${mediaType}/${timeWindow}`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

/**
 *  Query for search movies by keyword
 * @param query keyword
 * @param params
 */
export function getSearchMovieQuery(
  query: string,
  params: IParams = defaultParams
) {
  const queryString = `/search/movie?query=${query}`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

/**
 * Query for getting detail for a specific movie
 * @param id movie id
 * @param params
 */
export function getMovieDetailQuery(
  id: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${id}?append_to_response=credits,videos,images`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

/**
 * Query for specific movie's reviews
 * @param id id of movie
 * @param params 
 */
export function getMovieReviewQuery(
  id: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${id}/reviews`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

/**
 * Query for latest movie
 * @param params 
 */
export function getLatestMovieQuery(params:IParams = defaultParams){
  const queryString = `/movie/latest`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}

/**
 * Query for top rated movie
 * @param params 
 */
export function getTopRatedMovieQuery(params:IParams = defaultParams){
  const queryString = `/movie/top_rated`;
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}
