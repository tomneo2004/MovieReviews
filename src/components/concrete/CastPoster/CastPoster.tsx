import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import React from 'react';
import { CardContent, makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import style from './CastPosterStyle';

import imagePlacehoder from '../../../assets/placeholder/poster.svg';

type CastPosterProps = React.ComponentProps<typeof Card> & {
    imageWidth?: number;
    imageHeight?: number;
    imageSrc: string;
    name: string;
    characterName: string;
    width?: number;
    minHeight?: number;
}

const CastPoster: React.FC<CastPosterProps> = (props:CastPosterProps) => {
    const {
        imageWidth = 267,
        imageHeight = 350,
        imageSrc,
        name,
        characterName,
        width = imageWidth * 1.2,
        minHeight = 300,
        ...rest
    } = props;

    const classes = makeStyles(style)({
        ...props,
        imageWidth,
        width,
        minHeight,
    })

    return (
        <Card {...rest} className={classes.root} raised>
            <CardMedia 
            width={imageWidth}
            height={imageHeight}
            component='img' 
            src={imageSrc?imageSrc:imagePlacehoder} 
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