import Navigation from "../components/concrete/Navigation/Navigation";
import PageLayout from "../layouts/pageLayout";
import LandingLayout from "../layouts/landing/landingLayout";
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, fade, Typography, useTheme } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import React from "react";
import Trending from "../components/concrete/Trending/Trending";
import Popular from "../components/concrete/Popular/Popular";
import HeroSearchBar from "../components/concrete/HeroSearchBar/HeroSearchBar";
import { GetStaticProps } from "next";
import ProgressiveImage from "../components/unit/ProgressiveImage/ProgressiveImage";
import { motion } from "framer-motion";
import { LayoutIdTypes } from "../framer/LayoutIdTypes";
import axios from "axios";
import { IMovieData } from "../utils/api/model/apiModelTypes";

const caroselItems = ["Find Movies", "See Reviews", "Explores"];

interface IPageProps {
  bgImageSrc: string;
  popularMovies: IMovieData[];
  trendingMovies: {
    day: IMovieData[];
    week: IMovieData[];
  };
  error: any;
}

const apiPopularRoute = `${
  process.env.NEXT_PUBLIC_API_BASE_ROUTE || ""
}/api/popular/movies`;
const apiTrendingRoute = `${
  process.env.NEXT_PUBLIC_API_BASE_ROUTE || ""
}/api/trending/movies`;

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
    const resp = await axios.get(`${apiTrendingRoute}?timeWindow=day`);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

//https://developers.themoviedb.org/3/trending/get-trending
const fetchTrendingMoviesByWeek = async () => {
  try {
    const resp = await axios.get(`${apiTrendingRoute}?timeWindow=week`);
    const data: IMovieData[] = resp.data.results;
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getStaticProps: GetStaticProps<IPageProps> = async () => {
  const bgImageSrc =
    "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const revalidate = 86400;

  try {
    const popular = await fetchPopularMovies();
    const trendingByDay = await fetchTrendingMoviesByDay();
    const trendingByWeek = await fetchTrendingMoviesByWeek();

    return {
      props: {
        bgImageSrc,
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
        bgImageSrc,
        popularMovies: null,
        trendingMovies: null,
        error: e.message,
      },
      revalidate,
    };
  }
};

const LandingPage = (pageProps: IPageProps) => {
  const { bgImageSrc, popularMovies, trendingMovies, error } = pageProps;
  const theme = useTheme();

  return (
    <PageLayout
      navigation={
        <motion.div layoutId={LayoutIdTypes.navigation}>
          <Navigation position="sticky" hideOnScroll={true} />
        </motion.div>
      }
    >
      <LandingLayout>
        <HeroLayout
          background={
            <ProgressiveImage
              backdropColor={fade(theme.palette.primary.light, 0.3)}
              imageSrc={bgImageSrc}
              bgPosition="center center"
            />
          }
          title={
            <Typography id="hero-title" component="div" variant="h1">
              <Box fontWeight={500}>Welcome</Box>
            </Typography>
          }
          carousel={
            <Carousel
              indicators={false}
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={true}
              animation="slide"
            >
              {caroselItems.map((item) => {
                return (
                  <Typography key={item} variant="h4">
                    <Box fontWeight={500}>{item}</Box>
                  </Typography>
                );
              })}
            </Carousel>
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
              <Popular popularMovies={popularMovies} />
            </Box>
            {/* Trending Collection */}
            <Box id="trending">
              <Trending
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
