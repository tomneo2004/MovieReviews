import Box from '@material-ui/core/Box';
import React from 'react';
import PopularCollection from '../../components/movie.review/popular.collection/popular.collection.comp';

export interface IProps {
    title:React.ReactElement;
}

const PopularLayout = (props:IProps) => {
    const {
        title
    } = props;
    return (
        <Box px={1} py={3} alignSelf='stretch'>
            {title}
            <Box pt={2}><PopularCollection /></Box>
        </Box>
    );
};

export default PopularLayout;