import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import shortid from 'shortid';
import { orchestration, scaleFadeMotion } from '../../../framer/animation';
import { getRoute, RouteType } from '../../../routes/routesGenerator';
import { IMovieData } from '../../../utils/api/model/apiModelTypes';
import { buildImageQuery } from '../../../utils/api/query/apiQueryBuilder';
import getMovieRating from '../../../utils/movieRating';
import MoviePoster from '../moviePoster/moviePoster';

interface IProps {
    data:IMovieData[];
    keywords?:string;
}

const renderSkeletons = ()=>{
    const skls = [];
    for(let i=0; i<4; i++){
        skls.push(i);
    }

    return (
        <Grid container>
        {
            skls.map(sk=>{
                return (
                    <Grid key={sk} item xs>
                        <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                            <Card elevation={0}>
                                <Skeleton variant='rect' width={200} height={270} />
                                <CardContent>
                                    <Skeleton width='60%' />
                                    <Skeleton width='20%' />
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                )
            })
        }
        </Grid>
    )
}

const SearchResults = (props:IProps) => {
    const {
        data,
        keywords = '',
    } = props;

    if(!data) return renderSkeletons();

    if(!data.length){
        return (
            <Typography variant='h4' component='div'>
                <Box display='flex' justifyContent='center'>
                    {`We could not find any results for ${keywords}`}
                </Box>
            </Typography>
        )
    }

    return (
        <motion.div key='container' 
        variants={orchestration} initial='init' animate='enter' exit='exit'>
            <Grid container>
            {
                data.map(movie=>{
                    return (
                        <Grid key={movie.id} item xs>
                            <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                                <motion.div key={`${movie.id}`}
                                variants={scaleFadeMotion}>
                                    <Link href={getRoute(RouteType.movie, {id:movie.id.toString()})}>
                                        <MoviePoster 
                                        imageURL={buildImageQuery(movie.poster_path, 'w185')}
                                        imageWidth={185}
                                        minWidth={200}
                                        maxWidth={200}
                                        title={movie.title}
                                        releaseDate={movie.release_date}
                                        ratingScore={getMovieRating(movie.vote_count, movie.vote_average)}
                                        ratingOffsetX={-8}
                                        ratingOffsetY={-8}
                                        />
                                    </Link>
                                </motion.div>
                            </Box>
                        </Grid>
                    )
                })
            }    
            </Grid>
        </motion.div>
    )
};

export default SearchResults;