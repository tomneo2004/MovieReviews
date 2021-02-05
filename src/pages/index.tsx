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
import { motion } from "framer-motion";
import { LayoutIdType } from "../framer/LayoutIdType";

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
    navigation={
    <motion.div layoutId={LayoutIdType.navigation}>
      <Navigation position='sticky' hideOnScroll={true} />
    </motion.div>  
    }>
      <LandingLayout>
        <HeroLayout
          background={
            <ProgressiveImage 
            backdropColor={fade(theme.palette.primary.light, 0.3)} 
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
      bgImageSrc: 'https://images.unsplash.com/photo-1485095329183-d0797cdc5676?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  }
}

export default LandingPage
