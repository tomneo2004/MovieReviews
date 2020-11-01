import Navigation from "../components/movieReview/navigation/navigation"
import PageLayout from "../layouts/pageLayout"
import LandingLayout from '../layouts/landing/landingLayout';
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movieReview/landingSearch/landingSearch';
import RoundButton from '../components/unit/roundButton/roundButton';
import PopularCollection from '../components/movieReview/popularCollection/popularCollection';
import TrendingCollection from '../components/movieReview/trendingCollection/trendingCollection';

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
