import Navigation from "../components/movie.review/navigation/navigation.comp"
import PageLayout from "../layouts/page.layout"
import LandingLayout from '../layouts/landing/landing.layout';
import HeroLayout from "../layouts/landing/hero.layout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movie.review/landing.search/landing.search.comp';
import RoundButton from '../components/unit/round.button/round.button.comp';
import PopularCollection from '../components/movie.review/popular.collection/popular.collection.comp';
import TrendingCollection from '../components/movie.review/trending.collection/trending.collection.comp';

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
          {/* Pouplar Collection */}
          <Box px={1} py={3} alignSelf='stretch'>
            <PopularCollection title="What's popular" />
          </Box>
          {/* Trending Collection */}
          <Box px={1} py={3} alignSelf='stretch'>
            <TrendingCollection timeWindow='day' />
          </Box>
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
