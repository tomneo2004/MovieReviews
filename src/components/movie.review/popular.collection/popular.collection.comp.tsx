import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import WithPopularMovies, {IPopularMovieData, IPopularMoviesProps} from '../../hoc/popular.movies.comp';
import HScroll from '../../unit/horizontal.scroll/hScroll.comp';

export interface IProps extends IPopularMoviesProps{}

const transformMovieDataToPosters = (movieData:IPopularMovieData[])=>{
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
        return(
            <Paper key={data.id}>
                <Box p={1}><img src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`} /></Box>
                <Box p={1}>{data.title}</Box>
            </Paper>
        )
    })
}

/**
 * To fetch popular movies and render them in horizontal
 * scollable collection
 * 
 * @param props 
 */
const PopularMovieCollection = (props:IProps) => {
    const {
        popularMovies,
        errorMessage,
    } = props;

    if(errorMessage){
        console.log(errorMessage);
        return (
            <Typography component='div' variant='h3'>
                <Box>Sorry, popular movies are not avaliable at moment</Box>
            </Typography>
        )
    }
    return (
        <HScroll>
        {()=>transformMovieDataToPosters(popularMovies)}    
        </HScroll>
    );
};

export default WithPopularMovies(PopularMovieCollection);