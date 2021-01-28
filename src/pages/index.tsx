import Navigation from "../components/movieReview/navigation/navigation"
import PageLayout from "../layouts/pageLayout"
import LandingLayout from '../layouts/landing/landingLayout';
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, Typography } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel'
import SearchBar from '../components/movieReview/longSearchBar/longSearchBar';
import React from "react";
import {useRouter} from 'next/router';
import Trending from "../components/movieReview/trending/trending";
import Popular from "../components/movieReview/popular/popular";

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

const LandingPage = () => {
  const router = useRouter();

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
          <Popular />
          {/* Trending Collection */}
          <Trending />
      </LandingLayout>
    </PageLayout>
  )
}

export default LandingPage
