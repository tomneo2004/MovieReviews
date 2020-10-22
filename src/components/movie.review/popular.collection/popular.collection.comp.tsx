import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import withPopularMovies, {IPopularMovieData, IPopularMoviesProps} from '../../hoc/popular.movies.comp';
import HScroll from '../../unit/horizontal.scroll/hScroll.comp';

export interface IProps extends IPopularMoviesProps{}

const transformMovieDataToItems = (movieData:IPopularMovieData[])=>{
    if(movieData === null){
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

const PopularMovieCollection = (props:IProps) => {
    const {
        popularMovies
    } = props;

    return (
        <HScroll>
        {()=>transformMovieDataToItems(popularMovies)}    
        </HScroll>
    );
};

export default withPopularMovies(PopularMovieCollection);