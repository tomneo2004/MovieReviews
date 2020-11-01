import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TheatersIcon from '@material-ui/icons/Theaters';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './posterStyle';
import React from 'react';

export interface IProps {
    imageURL?: string;
    imageWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    title: string;
    screenDate: string;
    rating?: React.ReactElement;
    ratingOffsetX?: number;
    ratingOffsetY?: number;
}

const renderRating = (rating:React.ReactElement, xOffset:number, yOffset:number)=>{
    if(!rating) return null;
    return (<Box position='absolute' top={yOffset} left={xOffset}>{rating}</Box>);
}

const MoviePoster = (props:IProps) => {
    const {
        imageURL = '',
        imageWidth = 150,
        minWidth = imageWidth,
        maxWidth,
        title,
        screenDate,
        rating,
        ratingOffsetX = 0,
        ratingOffsetY = 0,
    } = props;

    const classes = makeStyles(style)();

    return (
        <Box position='relative' minWidth={minWidth} maxWidth={maxWidth?maxWidth:'inherit'} p={1}>
            <Card elevation={4} className={classes.hoverPointer}>
                <CardMedia 
                component="img"
                alt={`${title}`}
                width={imageWidth}
                image={`${imageURL}`}
                />
            </Card>
            <Typography component='div' variant='h6'>
                <Box className={classes.hoverPointer} pt={1}>{title}</Box>
            </Typography>
            <Typography component='div' variant='subtitle1'>
                <Box display='flex' alignItems='center'><TheatersIcon/>{screenDate}</Box>
            </Typography>
            {renderRating(rating, ratingOffsetX, ratingOffsetY)}    
        </Box>
    );
};

export default MoviePoster;