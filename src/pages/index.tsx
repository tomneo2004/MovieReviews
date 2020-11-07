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
import ScrollCollection from '../components/movieReview/hScrollCollection/hScrollCollection';
import {usePopularMovies} from '../effects/popularMovies';
import {useTrendingMovies} from '../effects/trendingMovies';

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

const transformMovieDataToPosters = (movieData:IMovieData[])=>{
  if(!movieData){
      const skeletons = [];
      for(let i=0; i<12; i++){
          skeletons.push(
              <Paper key={i}>
                  <Box width='150px' p={1}>
                      <Skeleton animation="wave" variant='rect' height='150px'/>
                      <Skeleton animation="wave" variant='text'/>
                      <Skeleton animation="wave" variant='text'/>
                  </Box>
              </Paper>
          );
      }
      return skeletons;
  }

  return movieData.map(data=>{
  
      let ratingScore: number = null;
      if(data.vote_count > 0){
          ratingScore = Math.round(data.vote_average * 10);
      }
      
      return(
          <MoviePoster 
          key={data.id}
          imageURL={buildImageQuery(data.poster_path, 200)}
          imageWidth={200}
          minWidth={200}
          title={data.title}
          releaseDate={data.release_date}
          ratingScore={ratingScore}
          ratingOffsetX={-8}
          ratingOffsetY={-8}
          />
      )
  })
}

const LandingPage = () => {
  const popularMovies = usePopularMovies();
  const trendingMovies = useTrendingMovies();

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
            <ScrollCollection title="What's popular">
              {()=>transformMovieDataToPosters(popularMovies.data)}
            </ScrollCollection>
          </Box>
          {/* Trending Collection */}
          <Box px={1} py={3} alignSelf='stretch'>
            <ScrollCollection title="Trending">
              {()=>transformMovieDataToPosters(trendingMovies.data)}
            </ScrollCollection>
          </Box>
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
