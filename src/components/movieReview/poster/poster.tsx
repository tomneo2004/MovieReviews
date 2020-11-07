import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './posterStyle';
import React from 'react';
import CircularRating from '../../unit/circularRating/circularRating';
import ThumbUpIcon from '@material-ui/icons/ThumbUpSharp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDownSharp';
import ThumbDownIcon from '@material-ui/icons/ThumbDownSharp';

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

const getCircularRating = (rating:number)=>{

    if(!rating) return null;

    const iconSize = {width:'15px',height:'15px'};
    let icon = <ThumbDownIcon style={iconSize} />
    if(rating >= 70) icon = <ThumbUpIcon style={iconSize} />;
    if(rating >= 50) icon = <ThumbsUpDownIcon style={iconSize} />;
    if(rating >= 0) icon = <ThumbDownIcon style={iconSize} />;

    return(
        <CircularRating value={rating} valueFlexDirection='column'
        valueEndAdornment={icon}
        />
    )
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
            <Card elevation={4} className={classes.hoverPointer} onMouseOver={onMouseOver}>
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
                <Box display='flex' alignItems='center'>
                {releaseDate}
                </Box>
            </Typography>
            {renderRating(ratingScore, ratingOffsetX, ratingOffsetY)}    
        </Box>
    );
};

export default Poster;