import Navigation from "../components/movieReview/navigation/navigation"
import PageLayout from "../layouts/pageLayout"
import LandingLayout from '../layouts/landing/landingLayout';
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movieReview/longSearchBar/longSearchBar';
import { IMovieData } from "../utils/api/model/apiModelTypes";
import { buildImageQuery } from '../utils/api/query/apiQueryBuilder';
import {usePopularMovies} from '../effects/apiFetch/popularMovies';
import {useTrendingMovies} from '../effects/apiFetch/trendingMovies';
import React from "react";
import ProgressiveImage from "../components/unit/progressiveImage/progressiveImage";
import {useRouter} from 'next/router';
import MovieCollection from "../components/movieReview/movieCollection/movieCollection";

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

const LandingPage = () => {
  const router = useRouter();
  const [popularBg, setPopularBg] = React.useState<string>('');
  const [trendingBg, setTrendingBg] = React.useState<string>('');
  const popularMovies = usePopularMovies();
  const trendingMovies = useTrendingMovies();

  const handlePopularMovieHover = (data:IMovieData)=>{
    setPopularBg(buildImageQuery(data.backdrop_path, 'original'));
  }

  const handleTrendingMovieHover = (data:IMovieData)=>{
    setTrendingBg(buildImageQuery(data.backdrop_path, 'original'));
  }

  const handleOnSearchClick = (keyword:string)=>{
    router.push(`/search?query=${keyword}`)
  }

  return (
    <PageLayout
    navigation={<Navigation position='sticky' hideOnScroll={true} />}
    >
      <LandingLayout>
        <HeroLayout 
          title={
            <Typography component='div' variant='h1'>
              <Box fontWeight={500}>Welcome</Box>
            </Typography>
          }
          carousel={
            <Carousel indicators={false} 
            navButtonsAlwaysVisible={false} navButtonsAlwaysInvisible={true} animation='slide'>
              {
                caroselItems.map((item)=>{
                  return (
                    <Typography key={item} variant='h4'>
                      <Box fontWeight={500}>{item}</Box>
                    </Typography>
                  )
                })
              }
            </Carousel>
          }
          search={<SearchBar onSearchClick={handleOnSearchClick} />}
          />
          {/* Pouplar Collection */}
          <ProgressiveImage imageSrc={popularBg} 
          backdropColor='popularBackdrop.main' px={1} py={3} alignSelf='stretch'
          keyframesAnimOut={{
            '0%':{transform:'translateY(0%)'},
            '100%':{transform:'translateY(100%)'}
          }}
          animOutTimeFun='ease'
          keyframesAnimIn={{
              '0%':{transform:'translateY(-100%)'},
              '100%':{transform:'translateY(0%)'}
          }}
          animInTimeFun='ease'
          >
            <MovieCollection 
            title={`What's popular`} 
            movieData={popularMovies.data}
            onHover={handlePopularMovieHover}
            />
          </ProgressiveImage>
          {/* Trending Collection */}
          <ProgressiveImage imageSrc={trendingBg} 
          backdropColor='trendingBackdrop.main' px={1} py={3} alignSelf='stretch'
          keyframesAnimOut={{
            '0%':{transform:'translate(0%)'},
            '100%':{transform:'translate(-100%)'}
          }}
          animOutTimeFun='ease'
          keyframesAnimIn={{
              '0%':{transform:'translate(100%)'},
              '100%':{transform:'translate(0%)'}
          }}
          animInTimeFun='ease'
          >
            <MovieCollection 
            title='Trending'
            movieData={trendingMovies.data}
            onHover={handleTrendingMovieHover}
            />
          </ProgressiveImage>
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
