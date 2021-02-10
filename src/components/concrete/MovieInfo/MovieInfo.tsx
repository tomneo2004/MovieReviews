import { Chip, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Skeleton, { SkeletonProps } from '@material-ui/lab/Skeleton';
import React from 'react';
import { IGenreData, IMovieDetailData } from '../../../utils/api/model/apiModelTypes';
import convertFilmLength from '../../../utils/filmLengthConverter';
import getMovieRating from '../../../utils/movieRating';
import {getCircularRating} from '../../unit/CircularRating/CircularRating';

type MovieInfoProps = React.ComponentProps<typeof Box> & {
    movieDetailData: IMovieDetailData;
}

const renderSkeletons = ()=>{
    const skProps1:SkeletonProps = {
        variant:'text',
        width:'40%',
        height:'10%'
    }
    const skProps2:SkeletonProps = {
        variant:'text',
        width:'60%',
    }
    return (
        <Box width='inherit' display='flex' flexDirection='column'>
            <Skeleton {...skProps1} />
            <Skeleton {...skProps2} />
            <Skeleton {...skProps1} />
            <Skeleton {...skProps2} />
            <Skeleton {...skProps2} />
            <Skeleton {...skProps1} />
            <Skeleton {...skProps2} />
            <Skeleton {...skProps2} />
        </Box>
    )
}

const renderGenre = (genre:IGenreData[])=>{
    return genre.map((g,i)=>{
        return (
            <Typography key={g.id} component='div' variant='h6'>
                <Box pl={i?2:0} fontWeight={600}>
                    <Chip label={g.name} />
                </Box>
            </Typography>
        )
    })
}

const MovieInfo: React.FC<MovieInfoProps> = (props:MovieInfoProps) => {
    const {
        movieDetailData,
        ...rest
    } = props;

    if(!movieDetailData) return renderSkeletons();

    const userScore =  getMovieRating(movieDetailData.vote_count, movieDetailData.vote_average);

    return (
        <Box {...rest} display='flex' flexDirection='column' p={2}>
            {/* title */}
            <Typography component='div' variant='h3'>
                <Box fontWeight={600}>{movieDetailData.title}</Box>
            </Typography>
            <Box pb={2} display='flex' flexWrap='wrap' alignItems='center'>
                {/* release date */}
                <Typography component='div' variant='h5'>
                    <Box fontWeight={400}>{movieDetailData.release_date}</Box>
                </Typography>
                {/* film length */}
                <Typography component='div' variant='h5'>
                    <Box pl={2} fontWeight={400}>{convertFilmLength(movieDetailData.runtime)}</Box>
                </Typography>
                <Box pl={2}>
                {getCircularRating(userScore)}
                </Box>
            </Box>
            {/* Genre */}
            <Box display='flex' flexDirection='column' pb={2}>
                <Typography component='div' variant='h4'>
                        <Box pb={1} fontWeight={600}>{'Genres'}</Box>
                </Typography>
                <Box display='flex' flexWrap='wrap'>
                {renderGenre(movieDetailData.genres)}
                </Box>
            </Box>
            {/* tageline */}
            <Typography component='div' variant='h5'>
                <Box pb={2} fontStyle='italic'>{movieDetailData.tagline}</Box>
            </Typography>
            {/* overview */}
            <Box display='flex' flexDirection='column'>
                <Typography component='div' variant='h4'>
                    <Box pb={1} fontWeight={600}>{'Overview'}</Box>
                </Typography>
                <Typography component='div' variant='h6'>
                    <Box>{movieDetailData.overview}</Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default MovieInfo;