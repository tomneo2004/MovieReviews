import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './rating.circular.style';
import React from 'react';

export interface IProps{
    opacity?: number;
}
const CircularRating = () => {
    const size = 50;
    const circleSize = 46;
    const diff = Math.ceil(Math.abs(size - circleSize) / 2);
    const opacity = 0.7;

    const classes = makeStyles(style)({opacity});

    return (
        <Box position='relative' width={size} height={size}>
            <Box position='absolute' left={0} right={0} top={0} bottom={0} 
            borderRadius='50px' bgcolor='#2d2d2d' px={`${diff}px`} py={`${diff}px`}>
                <CircularProgress className={classes.circleOpacity} size={circleSize} value={100} variant='static' />
            </Box>
            <Box position='absolute' left={0} right={0} top={0} bottom={0} 
            borderRadius='50px' bgcolor='transparent' px={`${diff}px`} py={`${diff}px`}>
                <CircularProgress className={classes.circleCap} color='secondary' size={circleSize} value={70} variant='static' />
            </Box>
            <Box position='absolute' left={0} right={0} top={0} bottom={0}
            display='flex' justifyContent='center' alignItems='center'
            >
                <Typography component='div' variant='caption' color='error'>
                    <Box>70%</Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRating;