import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import React from 'react';
import { CardContent, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import style from './castPosterStyle';

export interface IProps {
    imageWidth?: number;
    imageHeight?: number;
    imageSrc: string;
    name: string;
    characterName: string;
}

const CastPoster = (props:IProps) => {
    const {
        imageWidth = 267,
        imageHeight = 350,
        imageSrc,
        name,
        characterName
    } = props;

    const classes = makeStyles(style)({
        ...props,
        imageWidth
    })

    return (
        <Card className={classes.root}>
            <CardMedia 
            width={imageWidth}
            height={imageHeight}
            component='img' 
            src={imageSrc} 
            />
            <CardContent>
                <Typography component='div' variant='h6'>
                    <Box>{name}</Box>
                </Typography>
                <Typography component='div' variant='subtitle2'>
                    <Box>{characterName}</Box>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CastPoster;