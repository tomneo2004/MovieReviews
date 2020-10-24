import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import style from './rating.circular.style';
import React from 'react';
import { Variant } from '@material-ui/core/styles/createTypography';

export interface IProps{
    /** Size of rating, the outer circle
     *
     * default is 50 
     */
    size?: number;
    /** Size of circular progress, the inner circle
     * 
     * The size included circular mask and circular
     * progress
     * 
     * default is 44
     */
    progressSize?: number;
    /** Value of rating 0~100, default is 50 */
    value?: number;
    /** Max value of rating, this value is
     * used to clamp value
     */
    maxValue?: number;
    /** Min value of rating, this value is
     * used to clamp value
     */
    minValue?: number;
    /** background color of rating, the outer circle 
     * 
     * default  '#2d2d2d'
     */
    bgcolor?: any;
    /** Criteria for postive rating
     * 
     * If value is above and equal to this is counted
     * as postive
     * 
     * default 70
     */
    postiveCriteria?: number;
     /** Criteria for average rating
     * 
     * If value is above and equal to this is counted
     * as average
     * 
     * default 50
     */
    averageCriteria?: number;
    /** Criteria for negative rating
     * 
     * If value is above and equal to this is counted
     * as negative
     * 
     * default 0
     */
    negativeCriteria?: number;
    /** Color of rating when rating is postive
     * 
     * default '#4dd827'
     */
    postiveColor?: string;
    /** Color of rating when rating is average
     * 
     * default '#f2d50d'
     */
    averageColor?: string;
    /** Color of rating when rating is negative
     * 
     * default '#fa050f
     */
    negativeColor?: string;
    /** The opacity for circular mask
     * 0~1
     * 
     * default 0.5
     */
    maskOpacity?: number;
    /** Should value to be displayed
     * 
     * default false
     */
    hideValue?: boolean;
    /** Variant of value text
     * 
     * default 'caption'
     */
    valueVariant?: Variant;
    /** FontWeight of value text 
     * 
     * default 400
     */
    valueFontWeight?: number;
    /** FontSize of value text 
     * 
     * default '1em'  
     */
    valueFontSize?: any;
    /** EndAdornment for value 
     *
     * default null 
     */
    valueEndAdornment?: React.ReactElement;

    /**
     * flexbox direction for value and EndAdornment
     * 
     * default is 'row'
     */
    valueFlexDirection?: 'column' | 'row'
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
        hideValue = false,
        valueVariant = 'caption',
        valueFontWeight = 400,
        valueFontSize = '1em',
        valueEndAdornment = null,
        valueFlexDirection='row',
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
                size={progressSize} value={finalValue} variant='static' />
            </Box>

            <Box position='absolute' left={0} right={0} top={0} bottom={0}
            display='flex' justifyContent='center' alignItems='center'
            >
                <Typography className={classes.text} component='div' variant={valueVariant}>
                    <Box display='flex' 
                    flexDirection={valueFlexDirection} 
                    justifyContent='center' alignItems='center'>
                        {hideValue?null:
                            <Box 
                            fontSize={valueFontSize} 
                            fontWeight={valueFontWeight}>{finalValue}</Box>
                        }
                        {valueEndAdornment}
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRating;