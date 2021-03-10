import dynamic from "next/dynamic";
import PageLayout from "../layouts/pageLayout";
import LandingLayout from "../layouts/landing/landingLayout";
import HeroLayout from "../layouts/landing/heroLayout";
import Box from "@material-ui/core/Box/Box";
import { fade } from "@material-ui/core/styles/colorManipulator";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import HeroSearchBar from "../components/concrete/HeroSearchBar/HeroSearchBar";
import { GetStaticProps } from "next/types/index";
import ProgressiveImage from "../components/unit/ProgressiveImage/ProgressiveImage";
import RFCarousel from "../components/concrete/RFCarousel/RFCarousel";
import {
  BackdropSize,
  getBackdropImageQuery,
} from "../utils/api/query/apiQueryBuilder";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMoviesByDay,
  fetchTrendingMoviesByWeek,
  IPageProps,
  prepareCarousel,
} from "../pageUtils/landing";

const SnippetPopular = dynamic(
  () => import("../components/concrete/SnippetPopular/SnippetPopular"),
  { ssr: false }
);

const SnippetTrending = dynamic(
  () => import("../components/concrete/SnippetTrending/SnippetTrending"),
  { ssr: false }
);

const SnippetTopRated = dynamic(
  () => import("../components/concrete/SnippetTopRated/SnippetTopRated"),
  { ssr: false }
);

const SnippetNowPlaying = dynamic(
  () => import("../components/concrete/SnippetNowPlaying/SnippetNowPlaying"),
  { ssr: false }
);

export const getStaticProps: GetStaticProps<IPageProps> = async () => {
  const heroBackdropDefault =
    "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  const revalidate = 86400;
  const carousel = prepareCarousel();
  const heroTitle = "Start Explore";

  const topRatedMovies = await fetchTopRatedMovies();
  let heroBackdrop = heroBackdropDefault;

  //find hero backdrop from top rated movies
  for (let i = 0; i < topRatedMovies.results.length; i++) {
    const backdropPath = topRatedMovies.results[i].backdrop_path;
    if (backdropPath) {
      heroBackdrop = getBackdropImageQuery(backdropPath, BackdropSize.original);
      break;
    }
  }

  try {
    const popular = await fetchPopularMovies();
    const trendingByDay = await fetchTrendingMoviesByDay();
    const trendingByWeek = await fetchTrendingMoviesByWeek();
    const nowPlaying = await fetchNowPlayingMovies();

    return {
      props: {
        heroTitle,
        heroBackdrop,
        carousel,
        popularMovies: popular,
        topRatedMovies: topRatedMovies,
        nowPlayingMovies: nowPlaying,
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
        heroTitle,
        heroBackdrop,
        carousel,
        popularMovies: null,
        topRatedMovies: null,
        trendingMovies: null,
        nowPlayingMovies: null,
        error: e.message,
      },
      revalidate,
    };
  }
};

const LandingPage = (pageProps: IPageProps) => {
  const {
    heroTitle,
    heroBackdrop,
    carousel,
    popularMovies,
    topRatedMovies,
    trendingMovies,
    nowPlayingMovies,
    error,
  } = pageProps;
  const theme = useTheme();

  const classes = makeStyles({
    shadowText: {
      color: "transparent",
      textShadow: `1px 2px 1px ${fade(theme.palette.common.white, 0.8)}, 
      0 0 0 ${fade(theme.palette.common.black, 0.8)}`,
    },
  })();

  if (error) throw error;

  return (
    <PageLayout>
      <LandingLayout>
        <HeroLayout
          background={
            <ProgressiveImage
              backdropColor={fade(theme.palette.common.black, 0.4)}
              imageSrc={heroBackdrop}
              bgPosition="center center"
            />
          }
          title={
            <Typography
              className={classes.shadowText}
              id="hero-title"
              component="div"
              variant="h1"
            >
              <Box fontWeight={500}>{heroTitle}</Box>
            </Typography>
          }
          carousel={
            <Typography className={classes.shadowText} component="div">
              <RFCarousel
                height="12rem"
                variant="h3"
                textSet={carousel}
                interval={7000}
              />
            </Typography>
          }
          search={<HeroSearchBar />}
        />
        <React.Fragment>
          {/* Pouplar Collection */}
          <Box id="popular">
            <SnippetPopular mt={2} popularMovies={popularMovies.results} />
          </Box>

          {/* Trending Collection */}
          <Box id="trending">
            <SnippetTrending
              mt={2}
              byDay={trendingMovies.day.results}
              byWeek={trendingMovies.week.results}
            />
          </Box>

          {/* Top rated Collection */}
          <Box id="top-rated">
            <SnippetTopRated mt={2} topRatedMovies={topRatedMovies.results} />
          </Box>

          {/* Now playing */}
          <Box id="now-playing">
            <SnippetNowPlaying mt={2} nowPlayingMovies={nowPlayingMovies} />
          </Box>
        </React.Fragment>
      </LandingLayout>
    </PageLayout>
  );
};

export default LandingPage;
