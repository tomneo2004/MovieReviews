import Navigation from "../components/movie.review/navigation/navigation.comp"
import PageLayout from "../layouts/page.layout"
import LandingLayout from '../layouts/landing/landing.layout';
import HeroLayout from "../layouts/landing/hero.layout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movie.review/landing.search/landing.search.comp';
import RoundButton from '../components/unit/round.button/round.button.comp';
import PopularLayout from "../layouts/landing/popular.layout";
import TrendingLayout from "../layouts/landing/trending.layout";

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

const LandingPage = () => {
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
          <PopularLayout 
          title={
            <Typography component='div' variant='h4'>
              <Box pl={2} fontWeight={600}>What's popular</Box>
            </Typography>
          } 
          />
          <TrendingLayout
          title={
            <Typography component='div' variant='h4'>
              <Box pl={2} fontWeight={600}>Trending</Box>
            </Typography>
          }  
          />
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
