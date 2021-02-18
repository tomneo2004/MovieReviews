import PageLayout from "../layouts/pageLayout";
import LandingLayout from "../layouts/landing/landingLayout";
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, fade, Typography, useTheme } from "@material-ui/core";
import React from "react";
import Trending from "../components/concrete/Trending/Trending";
import Popular from "../components/concrete/Popular/Popular";
import HeroSearchBar from "../components/concrete/HeroSearchBar/HeroSearchBar";
import { GetStaticProps } from "next";
import ProgressiveImage from "../components/unit/ProgressiveImage/ProgressiveImage";
import axios from "axios";
import { IMovieData, ITopRatedMoviesData } from "../utils/api/model/apiModelTypes";
import RFCarousel, { RFCMotionOptions, RFCTextGroup } from "../components/concrete/RFCarousel/RFCarousel";
import { springTransition } from "../framer/Transition";
import { buildImageQuery, getPouplarMoviesQuery, getTopRatedMovieQuery, getTrendingQuery } from "../utils/api/query/apiQueryBuilder";


interface IPageProps {
  heroBackdrop: string;
  carousel:RFCTextGroup[];
  popularMovies: IMovieData[];
  trendingMovies: {
    day: IMovieData[];
    week: IMovieData[];
  };
  error: any;
}

const apiPopularRoute = getPouplarMoviesQuery();
const apiDayTrendingRoute = getTrendingQuery('movie', 'day');
const apiWeekTrendingRoute = getTrendingQuery('movie', 'week');
const apiTopRatedRoute = getTopRatedMovieQuery();

//https://developers.themoviedb.org/3/movies/get-popular-movies
const fetchPopularMovies = async () => {
  try {
    const resp = await axios.get(apiPopularRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

//https://developers.themoviedb.org/3/trending/get-trending
const fetchTrendingMoviesByDay = async () => {
  try {
    const resp = await axios.get(apiDayTrendingRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

//https://developers.themoviedb.org/3/trending/get-trending
const fetchTrendingMoviesByWeek = async () => {
  try {
    const resp = await axios.get(apiWeekTrendingRoute);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

const fetchTopRatedMovies = async ()=>{
  try {
    const resp = await axios.get(apiTopRatedRoute);
    const data: ITopRatedMoviesData = resp.data;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

const prepareCarousel = ()=>{
  const option1: RFCMotionOptions = {
    axis:'y',
    opacity:{from:0, to:1},
    enterTranistion: springTransition(300, 55, 0.1),
    exitTranistion: springTransition(300, 55, 1)
  }

  const option2: RFCMotionOptions = {
    ...option1,
    axis:'both',
    indent:2,
    enterTranistion: springTransition(355, 30, 1.5),
    exitTranistion: springTransition(300, 105, 0.1)
  }

  const option3: RFCMotionOptions = {
    ...option1,
    indent:4,
    enterTranistion: springTransition(300, 55, 0.5),
    exitTranistion: springTransition(300, 55, 0.5)
  }

  const set = [
    [
        {text:'See', motionOptions:option1}, 
        {text:'what movies are', motionOptions:option2},
        {text:'popular', motionOptions:option3}
    ],
    [
        {text:'Search', motionOptions:option1}, 
        {text:'favorite movies', motionOptions:option2},
        {text:'with title', motionOptions:option3}
    ],
    [
        {text:'Explore', motionOptions:option1}, 
        {text:'all movies', motionOptions:option2},
        {text:'and see what others say', motionOptions:option3}
    ]
  ] 

  return set;
}

export const getStaticProps: GetStaticProps<IPageProps> = async () => {
  const heroBackdropDefault = "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const revalidate = 86400;
  const carousel = prepareCarousel();

  const topRatedMovies = await fetchTopRatedMovies();
  let heroBackdrop = heroBackdropDefault;

  //find hero backdrop from top rated movies
  for(let i=0; i<topRatedMovies.results.length; i++){
    const backdropPath = topRatedMovies.results[i].backdrop_path;
    if(backdropPath){
      heroBackdrop = buildImageQuery(backdropPath, "original");;
      break;
    }
  }

  try {
    const popular = await fetchPopularMovies();
    const trendingByDay = await fetchTrendingMoviesByDay();
    const trendingByWeek = await fetchTrendingMoviesByWeek();

    return {
      props: {
        heroBackdrop,
        carousel,
        popularMovies: popular,
        trendingMovies: {
          day: trendingByDay,
          week: trendingByWeek,
        },
        error: null,
      },
      revalidate,
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        heroBackdrop,
        carousel,
        popularMovies: null,
        trendingMovies: null,
        error: e.message,
      },
      revalidate,
    };
  }
};

const LandingPage = (pageProps: IPageProps) => {
  const { heroBackdrop, carousel, popularMovies, trendingMovies, error } = pageProps;
  const theme = useTheme();

  return (
    <PageLayout>
      <LandingLayout>
        <HeroLayout
          background={
            <ProgressiveImage
              backdropColor={fade(theme.palette.primary.light, 0.3)}
              imageSrc={heroBackdrop}
              bgPosition="center center"
            />
          }
          title={
            <Typography id="hero-title" component="div" variant="h1">
              <Box fontWeight={500}>Start Explore</Box>
            </Typography>
          }
          carousel={
            <RFCarousel height='12rem' textSet={carousel} interval={7000} />
          }
          search={<HeroSearchBar />}
        />
        {error ? (
          <Typography variant="h4" component="div">
            <Box display="flex" justifyContent="center">
              {"Ooops, somthing is not right"}
            </Box>
          </Typography>
        ) : (
          <React.Fragment>
            {/* Pouplar Collection */}
            <Box id="popular">
              <Popular mt={2} popularMovies={popularMovies} />
            </Box>
            {/* Trending Collection */}
            <Box id="trending">
              <Trending
                mt={2}
                byDay={trendingMovies.day}
                byWeek={trendingMovies.week}
              />
            </Box>
          </React.Fragment>
        )}
      </LandingLayout>
    </PageLayout>
  );
};

export default LandingPage;
