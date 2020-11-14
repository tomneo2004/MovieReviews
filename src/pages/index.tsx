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
import HScroll from '../components/unit/horizontalScroll/hScroll';
import {usePopularMovies} from '../effects/popularMovies';
import {useTrendingMovies} from '../effects/trendingMovies';
import React from "react";
import ProgressiveImage from "../components/unit/progressiveImage/progressiveImage";
import {useRouter} from 'next/router';
import getMovieRating from "../utils/movieRating";

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

      return({
        id: data.id,
        element: (<MoviePoster 
          imageURL={buildImageQuery(data.poster_path, 'w185')}
          imageWidth={185}
          minWidth={200}
          title={data.title}
          releaseDate={data.release_date}
          ratingScore={getMovieRating(data.vote_count, data.vote_average)}
          ratingOffsetX={-8}
          ratingOffsetY={-8}
          onMouseOver={()=>handleMouseOver(data)}
          />)
      })
  })
}

const LandingPage = () => {
  const [popularBackdrop, setPopularBackdrop] = React.useState<{preview:string, image:string}>({
    preview: '',
    image: '',
  });
  const [trendingBackdrop, setTrendingBackdrop] = React.useState<{preview:string, image:string}>({
    preview: '',
    image: '',
  });

  const searchInputRef = React.useRef(undefined);

  const popularMovies = usePopularMovies();
  const trendingMovies = useTrendingMovies();
  const router = useRouter();

  const handlePopularMovieHover = (data:IMovieData)=>{
    setPopularBackdrop({
      preview: buildImageQuery(data.backdrop_path, 'w300'),
      image: buildImageQuery(data.backdrop_path, 'original'),
    });
  }

  const handleTrendingMovieHover = (data:IMovieData)=>{
    setTrendingBackdrop({
      preview: buildImageQuery(data.backdrop_path, 'w300'),
      image: buildImageQuery(data.backdrop_path, 'original'),
    });
  }

  const handleOnSearch = ()=>{
    router.push(`/search?query=${searchInputRef.current.value}`)
  }

  const handleOnSearchKeydown = (e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    if(e.key==='Enter') router.push(`/search?query=${searchInputRef.current.value}`)
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
          search={
              <SearchBar
              ref={searchInputRef}
              onKeyDown={handleOnSearchKeydown}
              placeholder='Movie Title' 
              cornerRadius='50px'
              endAdornment={
                <RoundButton variant='outlined' cornerRadius='50px' 
                size='large' onClick={handleOnSearch}>Search</RoundButton>
              } 
              />
          }
          />
          {/* Pouplar Collection */}
          <ProgressiveImage preview={popularBackdrop.preview} image={popularBackdrop.image} 
          backdropColor='popularBackdrop.main' px={1} py={3} alignSelf='stretch'
          >
            <React.Fragment>
              <Typography component='div' variant='h4'>
                  <Box pl={2} fontWeight={600}>{`What's popular`}</Box>
              </Typography>
              <Box pt={2}>
                  <HScroll>
                  {()=>transformMovieDataToPosters(popularMovies.data, handlePopularMovieHover)}    
                  </HScroll>
              </Box>
            </React.Fragment>
          </ProgressiveImage>
          {/* Trending Collection */}
          <ProgressiveImage preview={trendingBackdrop.preview} image={trendingBackdrop.image} 
          backdropColor='trendingBackdrop.main' px={1} py={3} alignSelf='stretch'
          >
            <React.Fragment>
              <Typography component='div' variant='h4'>
                  <Box pl={2} fontWeight={600}>{'Trending'}</Box>
              </Typography>
              <Box pt={2}>
                  <HScroll>
                  {()=>transformMovieDataToPosters(trendingMovies.data, handleTrendingMovieHover)}    
                  </HScroll>
              </Box>
            </React.Fragment>
          </ProgressiveImage>
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
