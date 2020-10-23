import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './rating.circular.style';
import React from 'react';

export interface IProps{
    /** Size of rating, default is 50 */
    size?: number;
    progressSize?: number;
    /** value of rating 0~100, default is 50 */
    value?: number;
    maxValue?: number;
    minValue?: number;
    /** background color of rating */
    bgcolor?: string;
    postiveCriteria?: number;
    averageCriteria?: number;
    negativeCriteria?: number;
    postiveColor?: string;
    averageColor?: string;
    negativeColor?: string;
    maskOpacity?: number;
}

export interface IStyleProps{
    finalColor: string;
    maskOpacity: number;
}

const CircularRating = (props:IProps) => {
    const {
        size = 50,
        progressSize = 44,
        value = 50,
        maxValue = 100,
        minValue = 0,
        bgcolor = '#2d2d2d',
        postiveCriteria = 70,
        averageCriteria = 50,
        negativeCriteria = 0,
        postiveColor = '#4dd827',
        averageColor = '#f2d50d',
        negativeColor = '#fa050f',
        maskOpacity = 0.5,
    } = props;

    const sizeDiff = Math.floor(Math.abs(size - progressSize) / 2);
    const finalValue = Math.min(Math.max(value, minValue),maxValue);
    let finalColor = postiveColor;
    if(finalValue >= postiveCriteria){
        finalColor = postiveColor;
    }
    else if(finalValue >= averageCriteria){
        finalColor = averageColor;
    }
    else if(finalValue >= negativeCriteria){
        finalColor = negativeColor;
    }
    else{
        finalColor = 'primary'
    }


    const classes = makeStyles(style)({
        finalColor,
        maskOpacity
    });

    return (
        <Box position='relative' width={size} height={size}>

            <Box position='absolute' left={0} right={0} top={0} bottom={0} 
            borderRadius='50px' bgcolor={bgcolor} px={`${sizeDiff}px`} py={`${sizeDiff}px`}>
                <CircularProgress className={classes.circleMask} size={progressSize} 
                value={100} variant='static' />
            </Box>

            <Box position='absolute' left={0} right={0} top={0} bottom={0} 
            borderRadius='50px' bgcolor='transparent' px={`${sizeDiff}px`} py={`${sizeDiff}px`}>
                <CircularProgress className={classes.circleCap}
                size={progressSize} value={value} variant='static' />
            </Box>

            <Box position='absolute' left={0} right={0} top={0} bottom={0}
            display='flex' justifyContent='center' alignItems='center'
            >
                <Typography className={classes.text} component='div' variant='caption'>
                    <Box>{value}%</Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRating;