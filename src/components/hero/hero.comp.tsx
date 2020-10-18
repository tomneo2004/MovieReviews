import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel'

export interface IProps {
    title:string;
    briefs?:string[];
}

interface ICarouselItemProps{
    title:string;
}
const CarouselItem = (props:ICarouselItemProps)=>{
    const {title} = props;

    return <Box textAlign='center'>{title}</Box>;
}

const renderCarousel = (briefs:string[])=>{
    if(!briefs) return null;

    return(
        <Carousel indicators={false} animation='slide' navButtonsAlwaysVisible={true}>
        {
            briefs.map((title, i)=>{
                return <CarouselItem key={i} title={title} />
            })
        }
        </Carousel>
    )
}

const Hero = (props:IProps) => {
    const {
        title,
        briefs = null
    } = props
    return (
        <Box>
            <Typography component='div' variant='h1'>
                <Box textAlign='center' p={3}>{title}</Box>
            </Typography>
            <Typography component='div' variant='h3'>
            {renderCarousel(briefs)}
            </Typography>
        </Box>
    );
};

export default Hero;