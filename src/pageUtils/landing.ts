import axios from "axios";
import {
  RFCMotionOptions,
  RFCTextGroup,
} from "../components/concrete/RFCarousel/RFCarousel";
import { springTransition } from "../framer/Transition";
import {
  IMovieData,
  INowPlayingData,
  ITopRatedMoviesData,
} from "../utils/api/model/apiModelTypes";
import {
  getNowPlayingMoviesQuery,
  getPouplarMoviesQuery,
  getTopRatedMovieQuery,
  getTrendingQuery,
} from "../utils/api/query/apiQueryBuilder";

export interface IPageProps {
  heroTitle: string;
  heroBackdrop: string;
  carousel: RFCTextGroup[];
  popularMovies: IMovieData[];
  topRatedMovies: IMovieData[];
  nowPlayingMovies: INowPlayingData;
  trendingMovies: {
    day: IMovieData[];
    week: IMovieData[];
  };
  error: any;
}

const apiPopularRoute = getPouplarMoviesQuery();
const apiDayTrendingRoute = getTrendingQuery("movie", "day");
const apiWeekTrendingRoute = getTrendingQuery("movie", "week");
const apiTopRatedRoute = getTopRatedMovieQuery();
const apiNowPlayingRoute = getNowPlayingMoviesQuery();

//https://developers.themoviedb.org/3/movies/get-popular-movies
export const fetchPopularMovies = async () => {
  try {
    const resp = await axios.get(apiPopularRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

//https://developers.themoviedb.org/3/trending/get-trending
export const fetchTrendingMoviesByDay = async () => {
  try {
    const resp = await axios.get(apiDayTrendingRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

//https://developers.themoviedb.org/3/trending/get-trending
export const fetchTrendingMoviesByWeek = async () => {
  try {
    const resp = await axios.get(apiWeekTrendingRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const resp = await axios.get(apiTopRatedRoute);
    const data: ITopRatedMoviesData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const resp = await axios.get(apiNowPlayingRoute);
    const data: INowPlayingData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const prepareCarousel = () => {
  const option1: RFCMotionOptions = {
    axis: "y",
    opacity: { from: 0, to: 1 },
    enterTranistion: springTransition(300, 25, 0.1),
    exitTranistion: springTransition(300, 105, 1),
  };

  const option2: RFCMotionOptions = {
    ...option1,
    axis: "x",
    indent: 2,
    enterTranistion: springTransition(600, 35, 0.5),
    exitTranistion: springTransition(300, 105, 0.5),
  };

  const option3: RFCMotionOptions = {
    ...option1,
    axis: "x",
    indent: 4,
    enterTranistion: springTransition(600, 35, 1),
    exitTranistion: springTransition(300, 105, 0.1),
  };

  const set = [
    [
      { text: "See", motionOptions: option1 },
      { text: "what movies are", motionOptions: option2 },
      { text: "popular", motionOptions: option3 },
    ],
    [
      { text: "Search", motionOptions: option1 },
      { text: "favorite movies", motionOptions: option2 },
      { text: "with title", motionOptions: option3 },
    ],
    [
      { text: "Explore", motionOptions: option1 },
      { text: "all movies", motionOptions: option2 },
      { text: "and see what others say", motionOptions: option3 },
    ],
  ];

  return set;
};

export default {};
