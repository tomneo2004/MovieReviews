import { Box } from '@material-ui/core';
import React from 'react';

export interface IProps {
    background: React.ReactElement;
    title: React.ReactElement;
    carousel: React.ReactElement;
    search: React.ReactElement;
}
const HeroLayout = (props:IProps) => {
    const {
        background,
        title,
        carousel,
        search,
    } = props;
    return (
        <Box position='relative' px={2} py={7} overflow='hidden'
        display='flex' flexDirection='column' justifyContent='center' 
        alignItems='center' alignSelf='stretch'>
            {background}
            {title}
            {carousel}
            <Box pt={6} alignSelf='stretch'>
                {search}
            </Box>
        </Box>
    );
};

export default HeroLayout;