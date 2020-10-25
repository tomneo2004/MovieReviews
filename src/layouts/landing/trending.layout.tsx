import Box from '@material-ui/core/Box';
import React from 'react';
import TrendingCollection from '../../components/movie.review/trending.collection/trending.collection.comp';

export interface IProps {
    title:React.ReactElement;
}

const TrendingLayout = (props:IProps) => {
    const {
        title
    } = props;
    return (
        <Box px={1} py={3} alignSelf='stretch'>
            {title}
            <Box pt={2}><TrendingCollection /></Box>
        </Box>
    );
};

export default TrendingLayout;