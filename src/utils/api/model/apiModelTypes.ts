/**
 * Model defintion for Pouplar and Trending movies
 */
export type IMovieData = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};

export type ISearchMovieData = {
  page: number;
  total_results: number;
  total_pages: number;
  results: IMovieData[];
};

export type IGenreData = {
  id: number;
  name: string;
};

export type IProductionCompanyData = {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
};

export type IProductionCountryData = {
  iso_3166_1: string;
  name: string;
};

export type ISpokenLanguageData = {
  iso_639_1: string;
  name: string;
};

export type ICastData = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type ICrewData = {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  department: string;
  job: string;
};

export type ICreditsData = {
  cast: ICastData[];
  crew: ICrewData[];
};

export type IVideoData = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
};

export type IVideosData = {
  id: number;
  results: IVideoData[];
};

export type IMovieBackdropData = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type IMoviePosterData = {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type IMovieImagesData = {
  id: number;
  backdrops: IMovieBackdropData[];
  posters: IMoviePosterData[];
};

export type IMovieDetailData = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | { [key: string]: any };
  budget: number;
  genres: IGenreData[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: IProductionCompanyData[];
  production_countries: IProductionCountryData[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: ISpokenLanguageData[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: ICreditsData;
  videos: IVideosData;
  images: IMovieImagesData;
};

export type IAuthorDetailsData = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
};

export type IReviewData = {
  author: string;
  author_details: IAuthorDetailsData;
  content: string;
  created_at: string;
  id: string;
  update_at: string;
  url: string;
};

export type IMovieReviewsData = {
  id: number;
  page: number;
  results: IReviewData[];
  total_pages: number;
  total_results: number;
};

export type ILatestMovieData = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: IGenreData[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: IProductionCompanyData[];
  production_countries: IProductionCountryData[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { [key: string]: any }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ITopRatedMoviesData = {
  page: number;
  results: IMovieData[];
  total_results: number;
  total_pages: number;
};
