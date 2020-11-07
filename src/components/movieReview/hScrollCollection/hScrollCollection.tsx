import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import React from 'react';
import HScroll from '../../unit/horizontalScroll/hScroll';


export interface IProps {
    title?:string;
    children:()=>React.ReactElement[];
}

/**
 * To fetch popular movies and render them in horizontal
 * scollable collection
 * 
 * @param props 
 */
const HScrollCollection = (props:IProps) => {
    const {
        title = 'Collection Name',
        children,
    } = props;

    return (
        <Box>
            <Typography component='div' variant='h4'>
                <Box pl={2} fontWeight={600}>{title}</Box>
            </Typography>
            <Box pt={2}>
                <HScroll>
                {()=>children()}    
                </HScroll>
            </Box>
        </Box>
    );
};

export default HScrollCollection;