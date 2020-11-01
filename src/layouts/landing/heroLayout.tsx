import { Box } from '@material-ui/core';
import React from 'react';

export interface IProps {
    title: React.ReactElement;
    carousel: React.ReactElement;
    search: React.ReactElement;
}
const HeroLayout = (props:IProps) => {
    const {
        title,
        carousel,
        search,
    } = props;
    return (
        <Box px={2} py={3} 
        display='flex' flexDirection='column' justifyContent='center' 
        alignItems='center' alignSelf='stretch'>
            {title}
            {carousel}
            <Box pt={6} alignSelf='stretch'>
                {search}
            </Box>
        </Box>
    );
};

export default HeroLayout;