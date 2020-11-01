import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import WithPopularMovies, {IPopularMovieData, IPopularMoviesProps} from '../../hoc/withPopularMovies';
import HScroll from '../../unit/horizontalScroll/hScroll';
import MoviePoster from '../../unit/Poster/poster';
import CircularRating from '../../unit/circularRating/circularRating';
import ThumbUpIcon from '@material-ui/icons/ThumbUpSharp';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDownSharp';
import ThumbDownIcon from '@material-ui/icons/ThumbDownSharp'; 
import { buildImageQuery } from '../../../utils/apiQueryBuilder';

export interface IProps extends IPopularMoviesProps{
    title?:string;
}



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
            <MoviePoster 
            key={data.id}
            imageURL={buildImageQuery(data.poster_path, 200)}
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
const PopularMovieCollection = (props:IProps) => {
    const {
        title = 'Popular',
        popularMovies,
        errorMessage,
    } = props;

    if(errorMessage){
        return (
            <Typography component='div' variant='h3'>
                <Box>Sorry, popular movies are not avaliable at moment</Box>
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
                {()=>transformMovieDataToPosters(popularMovies)}    
                </HScroll>
            </Box>
        </Box>
    );
};

export default WithPopularMovies(PopularMovieCollection);