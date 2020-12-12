import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './posterStyle';
import React from 'react';
import {getCircularRating} from '../../unit/circularRating/circularRating';
import PosterImage from '../../unit/posterImage/posterImage';

export interface IProps {
    imageURL?: string;
    imageWidth?: number;
    minWidth?: number;
    maxWidth?: number;
    title: string;
    releaseDate: string;
    /** 
     * Rating score 0 ~ 100
     * 
     * null to hide rating
     * 
     * default null
     */
    ratingScore?: number;
    ratingOffsetX?: number;
    ratingOffsetY?: number;
    onMouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const renderRating = (rating:number, xOffset:number, yOffset:number)=>{
    const ratingComp = getCircularRating(rating);
    return (<Box position='absolute' top={yOffset} left={xOffset}>{ratingComp}</Box>);
}

const Poster = (props:IProps) => {
    const {
        imageURL = '',
        imageWidth = 150,
        minWidth = imageWidth,
        maxWidth,
        title,
        releaseDate,
        ratingScore = null,
        ratingOffsetX = 0,
        ratingOffsetY = 0,
        onMouseOver = null,
    } = props;

    const classes = makeStyles(style)();

    return (
        <Box position='relative' minWidth={minWidth} maxWidth={maxWidth?maxWidth:'inherit'} p={1}>
            <PosterImage 
            imageURL={imageURL}
            elevation={4} 
            className={classes.hoverPointer} 
            onMouseOver={onMouseOver}
            imageWidth={imageWidth}
            />
            <Typography component='div' variant='h6'>
                <Box className={classes.hoverPointer} pt={1}>{title}</Box>
            </Typography>
            <Typography component='div' variant='subtitle1'>
                <Box display='flex' alignItems='center'>
                {releaseDate}
                </Box>
            </Typography>
            {renderRating(ratingScore, ratingOffsetX, ratingOffsetY)}    
        </Box>
    );
};

export default Poster;