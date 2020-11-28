import { makeStyles } from '@material-ui/core';
import Card, { CardProps } from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';
import style from './posterImageStyle';

import imagePlacehoder from '../../../assets/placeholder/poster.svg';
import Box from '@material-ui/core/Box/Box';

export interface IProps extends CardProps {
    alt?: string;
    imageWidth: number;
    /**
     * Ratio between image width and height
     * 
     * e.g width=150, aspectRatio=1.5, height=width * aspectRatio
     * 
     * default is 1.5
     */
    aspectRatio?: number;
    imageURL?: string;
}

const PosterImage = (props:IProps) => {
    const {
        alt = 'image',
        imageURL = '',
        imageWidth,
        aspectRatio = 1.5,
        ...rest
    } = props;
    const classes = makeStyles(style)();

    return (
        <Box position='relative' minWidth={imageWidth} maxWidth={imageWidth}>
            <Card {...rest}>
                <CardMedia 
                className={classes.cardMedia}
                component="img"
                alt={alt}
                width={imageWidth}
                height={imageWidth*aspectRatio}
                src={imageURL?imageURL:imagePlacehoder}
                />
            </Card>
        </Box>
    );
};

export default PosterImage;