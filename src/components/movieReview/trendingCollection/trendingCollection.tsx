import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import WithTrendingMovies, {ITrendingMovieData, ITrendingMoviesProps} from '../../hoc/withTrendingMovies';
import HScroll from '../../unit/horizontalScroll/hScroll';
import MoviePoster from '../poster/poster';
import { buildImageQuery } from '../../../utils/apiQueryBuilder';

export interface IProps extends ITrendingMoviesProps{
    title?:string;
}

const transformMovieDataToPosters = (movieData:ITrendingMovieData[])=>{
    if(!movieData){
        const skeletons = [];
        for(let i=0; i<12; i++){
            skeletons.push(
                <Paper key={i}>
                    <Box width='150px' p={1}>
                        <Skeleton animation="wave" variant='rect' height='150px'/>
                        <Skeleton animation="wave" variant='text'/>
                        <Skeleton animation="wave" variant='text'/>
                    </Box>
                </Paper>
            );
        }
        return skeletons;
    }

    return movieData.map(data=>{
        
        let ratingScore: number = null;
        if(data.vote_count > 0){
            ratingScore = Math.round(data.vote_average * 10);
        }

        return(
            <MoviePoster 
            key={data.id}
            imageURL={buildImageQuery(data.poster_path, 200)}
            imageWidth={200}
            minWidth={200}
            title={data.title}
            releaseDate={data.release_date}
            ratingScore={ratingScore}
            ratingOffsetX={-8}
            ratingOffsetY={-8}
            />
        )
    })
}

/**
 * To fetch popular movies and render them in horizontal
 * scollable collection
 * 
 * @param props 
 */
const TrendingMovieCollection = (props:IProps) => {
    const {
        title = 'Trending',
        trendingMovies,
        errorMessage,
    } = props;

    if(errorMessage){
        return (
            <Typography component='div' variant='h3'>
                <Box>Sorry, trending movies are not avaliable at moment</Box>
            </Typography>
        )
    }
    return (
        <Box>
            <Typography component='div' variant='h4'>
                <Box pl={2} fontWeight={600}>{title}</Box>
            </Typography> 
            <Box pt={2}>
                <HScroll>
                {()=>transformMovieDataToPosters(trendingMovies)}    
                </HScroll>
            </Box>   
        </Box>
    );
};

export default WithTrendingMovies(TrendingMovieCollection);