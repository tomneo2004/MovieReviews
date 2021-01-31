import Navigation from "../components/movieReview/navigation/navigation"
import PageLayout from "../layouts/pageLayout"
import LandingLayout from '../layouts/landing/landingLayout';
import HeroLayout from "../layouts/landing/heroLayout";
import { Box, fade, Typography, useTheme } from "@material-ui/core";
import Carousel from 'react-material-ui-carousel';
import React from "react";
import Trending from "../components/movieReview/trending/trending";
import Popular from "../components/movieReview/popular/popular";
import HeroSearchBar from "../components/movieReview/heroSearchBar/heroSearchBar";
import { GetStaticProps } from "next";
import ProgressiveImage from "../components/unit/progressiveImage/progressiveImage";

const caroselItems = [
  'Find Movies',
  'See Reviews',
  'Explores',
]

interface IPageProps {
  bgImageSrc: string;
}

const LandingPage = (pageProps:IPageProps) => {
  const {bgImageSrc} = pageProps;
  const theme = useTheme();

  return (
    <PageLayout
    navigation={<Navigation position='sticky' hideOnScroll={true} />}
    >
      <LandingLayout>
        <HeroLayout
          background={
            <ProgressiveImage 
            backdropColor={fade(theme.palette.common.white, 0.3)} 
            imageSrc={bgImageSrc}
            bgPosition='center center'
            />
          } 
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
          search={<HeroSearchBar />}
          />
          {/* Pouplar Collection */}
          <Popular />
          {/* Trending Collection */}
          <Trending />
      </LandingLayout>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps<IPageProps> = async () => {
  return {
    props:{
      bgImageSrc: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
    }
  }
}

export default LandingPage
