import Navigation from "../components/movieReview/navigation/navigation"
import PageLayout from "../layouts/pageLayout"
import LandingLayout from '../layouts/landing/landingLayout';
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movieReview/landingSearch/landingSearch';
import RoundButton from '../components/unit/roundButton/roundButton';
import { IMovieData } from "../utils/apiModelTypes";
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import MoviePoster from '../components/movieReview/poster/poster';
import { buildImageQuery } from '../utils/apiQueryBuilder';
import HorizontalScroll from '../components/unit/horizontalScroll/hScroll';
import {usePopularMovies} from '../effects/popularMovies';
import {useTrendingMovies} from '../effects/trendingMovies';
import React from "react";

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

const transformMovieDataToPosters = (
  movieData:IMovieData[],
  onHover:(data:IMovieData)=>void = null)=>{

  if(!movieData){
      const skeletons = [];
      for(let i=0; i<12; i++){
          skeletons.push({
            id:i,
            element: (<Paper key={i}>
              <Box width='150px' p={1}>
                  <Skeleton animation="wave" variant='rect' height='150px'/>
                  <Skeleton animation="wave" variant='text'/>
                  <Skeleton animation="wave" variant='text'/>
              </Box>
          </Paper>)
          });
      }
      return skeletons;
  }

  const handleMouseOver = (data:IMovieData)=>{
    if(onHover) onHover(data);
  }

  return movieData.map(data=>{
  
      let ratingScore: number = null;
      if(data.vote_count > 0){
          ratingScore = Math.round(data.vote_average * 10);
      }
      
      return({
        id: data.id,
        element: (<MoviePoster 
          imageURL={buildImageQuery(data.poster_path, 'w200')}
          imageWidth={200}
          minWidth={200}
          title={data.title}
          releaseDate={data.release_date}
          ratingScore={ratingScore}
          ratingOffsetX={-8}
          ratingOffsetY={-8}
          onMouseOver={()=>handleMouseOver(data)}
          />)
      })
  })
}

const LandingPage = () => {
  const [popularBackdropURL, setPopularBackdropURL] = React.useState<string>('');

  const popularMovies = usePopularMovies();
  const trendingMovies = useTrendingMovies();

  const handlePopularMovieHover = (data:IMovieData)=>{
    console.log('popular ',data.backdrop_path);
    setPopularBackdropURL(buildImageQuery(data.backdrop_path, 'original'));
  }

  const handleTrendingMovieHover = (data:IMovieData)=>{
    console.log('trending ',data.backdrop_path);
  }

  console.log('popular backdrop ', popularBackdropURL)

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
          search={
              <SearchBar 
              placeholder='Movie Title' 
              cornerRadius='50px'
              endAdornment={
                <RoundButton variant='outlined' cornerRadius='50px' size='large'>Search</RoundButton>
              } 
              />
          }
          />
          {/* Pouplar Collection */}
          <Box px={1} py={3} alignSelf='stretch'>
            <Typography component='div' variant='h4'>
                <Box pl={2} fontWeight={600}>{`What's popular`}</Box>
            </Typography>
            <Box pt={2}>
                <HorizontalScroll>
                {()=>transformMovieDataToPosters(popularMovies.data, handlePopularMovieHover)}    
                </HorizontalScroll>
            </Box>
          </Box>
          {/* Trending Collection */}
          <Box px={1} py={3} alignSelf='stretch'>
            <Typography component='div' variant='h4'>
                <Box pl={2} fontWeight={600}>{'Trending'}</Box>
            </Typography>
            <Box pt={2}>
                <HorizontalScroll>
                {()=>transformMovieDataToPosters(trendingMovies.data, handleTrendingMovieHover)}    
                </HorizontalScroll>
            </Box>
          </Box>
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
