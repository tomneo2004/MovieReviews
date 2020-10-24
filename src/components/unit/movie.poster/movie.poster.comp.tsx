import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './movie.poster.style';
import React from 'react';

export interface IProps {
    imageURL?: string;
    imageWidth?: number;
    title: string;
    screenDate: string;
    rating?: React.ReactElement;
}

const renderRating = (rating:React.ReactElement)=>{
    if(!rating) return null;
    return (<Box position='absolute' top='9px' left='9px'>{rating}</Box>);
}

const MoviePoster = (props:IProps) => {
    const {
        imageURL = '',
        imageWidth = 150,
        title,
        screenDate,
        rating,
    } = props;

    const classes = makeStyles(style)();

    return (
        <Box width='max-content' p={1}>
            <Card elevation={4} className={classes.hoverPointer}>
                <CardMedia 
                component="img"
                alt={`${title}`}
                width={imageWidth}
                image={`${imageURL}`}
                />
                {renderRating(rating)}
            </Card>
            <Typography component='div' variant='h6'>
                <Box className={classes.hoverPointer} pt={1}>{title}</Box>
            </Typography>
            <Typography component='div' variant='subtitle1'>
                <Box>{screenDate}</Box>
            </Typography>    
        </Box>
    );
};

export default MoviePoster;