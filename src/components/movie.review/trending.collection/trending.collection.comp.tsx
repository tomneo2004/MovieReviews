import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import WithTrendingMovies, {ITrendingMovieData, ITrendingMoviesProps} from '../../hoc/trending.movies.comp';
import HScroll from '../../unit/horizontal.scroll/hScroll.comp';
import MoviePoster from '../../unit/movie.poster/movie.poster.comp';
import CircularRating from '../../unit/rating.circular/rating.circular.comp';
import ThumbUpIcon from '@material-ui/icons/ThumbUpSharp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDownSharp';
import ThumbDownIcon from '@material-ui/icons/ThumbDownSharp'; 

export interface IProps extends ITrendingMoviesProps{}



const getRatingComponent = (voteAverage:number, voteCount:number)=>{

    function getRatingIcon(rating:number){
        const iconSize = {width:'15px',height:'15px'};
        if(rating >= 70) return (<ThumbUpIcon style={iconSize} />);
        if(rating >= 50) return (<ThumbsUpDownIcon style={iconSize} />);
        if(rating >= 0) return (<ThumbDownIcon style={iconSize} />);
    
        return (<ThumbDownIcon style={iconSize} />)
    }

    if(voteCount <= 0) return null;
    const rating = Math.round(voteAverage * 10);

    return(
        <CircularRating value={rating} valueFlexDirection='column'
        valueEndAdornment={getRatingIcon(rating)}
        />
    )
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
        
        return(
            <MoviePoster 
            key={data.id}
            imageURL={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
            imageWidth={200}
            minWidth={200}
            title={data.title}
            screenDate={data.release_date}
            rating={getRatingComponent(data.vote_average, data.vote_count)}
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
        popularMovies,
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
        <HScroll>
        {()=>transformMovieDataToPosters(popularMovies)}    
        </HScroll>
    );
};

export default WithTrendingMovies(TrendingMovieCollection, 'week');