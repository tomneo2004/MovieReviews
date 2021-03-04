import urljoin from "url-join";
import { buildAPIQuery, IParams, defaultParams } from "./queryHelper";

const imageAPI = "https://image.tmdb.org";
const movieAPI = "https://api.themoviedb.org";
const movieAPIVersion = "3";
const movieAPIKey = process.env.MOVIE_API_KEY;

/**
 * Get image source from themoviedb
 *
 * @param imagePath image path
 * @param imageSize reference to
 *
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export function buildImageQuery(imagePath: string, imageSize: string = "w200") {
  if (!imagePath) return "";

  const buildQuery = urljoin(imageAPI, "t", "p", imageSize, imagePath);

  return buildQuery;
}

export enum PosterSize {
  "w92" = "w92",
  "w154" = "w154",
  "w185" = "w185",
  "w342" = "w342",
  "w500" = "w500",
  "w780" = "w780",
  "original" = "original",
}

/**
 * Return query for poster image
 *
 * @param imagePath image path relative to themoviedb
 * @param {PosterSize} imageSize size of poster
 *
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export function getPosterImageQuery(
  imagePath: string,
  imageSize: PosterSize = PosterSize.original
) {
  const buildQuery = buildImageQuery(imagePath, imageSize);

  return buildQuery;
}

export enum ProfileSize {
  "w45" = "w45",
  "w185" = "w185",
  "h632" = "h632",
  "original" = "original",
}

/**
 * Return query for profile image
 *
 * @param imagePath image path relative to themoviedb
 * @param {ProfileSize} imageSize size of poster
 *
 * https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export function getProfileImageQuery(
  imagePath: string,
  imageSize: ProfileSize = ProfileSize.original
) {
  const buildQuery = buildImageQuery(imagePath, imageSize);

  return buildQuery;
}

export enum BackdropSize {
  "w300" = "w300",
  "w780" = "w780",
  "w1280" = "w1280",
  "original" = "original",
}

/**
 * Return query for backdrop image
 *
 * @param imagePath image path relative to themoviedb
 * @param {BackdropSize}imageSize size of backdrop
 */
export function getBackdropImageQuery(
  imagePath: string,
  imageSize: BackdropSize = BackdropSize.original
) {
  const buildQuery = buildImageQuery(imagePath, imageSize);

  return buildQuery;
}

/**
 * Get query for popular movie
 *
 * @param {IParams} params
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

/**
 * Get query for discover movie
 * @param {IParams} params
 */
export function getDiscoverMoviesQuery(
  genreId: string = "",
  params: IParams = defaultParams
) {
  let queryString = "/discover/movie?";
  if (genreId) {
    queryString += `&with_genres=${genreId}`;
  }
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
 * Get query for movie that is now playing
 *
 * @param {IParams} params
 */
export function getNowPlayingMoviesQuery(params: IParams = defaultParams) {
  const queryString = "/movie/now_playing";
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
 * Get query for similar movies
 *
 * @param refMovieId reference movide id
 * @param params
 */
export function getSimilarMoviesQuery(
  refMovieId: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${refMovieId}/similar`;
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
 * Get query for recommended movies
 *
 * @param refMovieId reference movide id
 * @param params
 */
export function getRecommendationMoviesQuery(
  refMovieId: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${refMovieId}/recommendations`;
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
 * @param {IParams} params
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
export function getLatestMovieQuery(params: IParams = defaultParams) {
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
export function getTopRatedMovieQuery(params: IParams = defaultParams) {
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

/**
 * Query for movie's videos
 * @param id movie id
 * @param params
 */
export function getMovieVideosQuery(
  id: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${id}/videos`;
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
 * Query for movie's images
 * @param id movie id
 * @param params
 */
export function getMovieImagesQuery(
  id: string,
  params: IParams = defaultParams
) {
  const queryString = `/movie/${id}/images`;
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
 * Query for genres for movies
 * @param id movie id
 * @param params
 */
export function getMovieGenreListQuery(params: IParams = defaultParams) {
  const queryString = "/genre/movie/list";
  const builtQuery = buildAPIQuery(
    queryString,
    movieAPI,
    movieAPIVersion,
    movieAPIKey,
    params
  );
  return builtQuery;
}
