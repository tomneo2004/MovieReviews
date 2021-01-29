import React from 'react';
import {useRouter} from 'next/router';
import {useMovieDetail} from '../../effects/apiFetch/movieDetail';
import Navigation from '../../components/movieReview/navigation/navigation';
import PageLayout from '../../layouts/pageLayout';
import MovieLayout from '../../layouts/movie/movieLayout';
import PosterImage from '../../components/unit/posterImage/posterImage';
import { buildImageQuery } from '../../utils/api/query/apiQueryBuilder';
import Box from '@material-ui/core/Box';
import MovieInfo from '../../components/movieReview/movieInfo/movieInfo';
import getMovieRating from '../../utils/movieRating';
import {IMovieDetailData } from '../../utils/api/model/apiModelTypes';
import Typography from '@material-ui/core/Typography';
import { useMovieReviews } from '../../effects/apiFetch/movieReviews';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CastCollection from '../../components/movieReview/castCollection/castCollection';
import ReviewCollection from '../../components/movieReview/reviewCollection/reviewCollection';

const renderPoster = (movieDetail:IMovieDetailData)=>{
    if(!movieDetail){
        return (
            <Skeleton variant='rect' width={342} height={342 * 1.5} />
        )
    }

    return (
        <PosterImage 
        imageURL={buildImageQuery(movieDetail.poster_path, 'w342')}
        imageWidth={342}
        />
    )
}

const renderMovieInfo = (movieDetail:IMovieDetailData)=>{
    if(!movieDetail){
        return (
            <React.Fragment>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='60%' />
            </React.Fragment>
        )
    }

    return (
        <MovieInfo 
        title={movieDetail.title}
        releaseDate={movieDetail.release_date}
        length={movieDetail.runtime}
        genre={movieDetail.genres}
        userScore={getMovieRating(movieDetail.vote_count, movieDetail.vote_average)}
        tagline={movieDetail.tagline}
        overview={movieDetail.overview}
        />
    )
}

const MoviePage = () => {
    const router = useRouter();
    const {id} = router.query as {[key:string]:string};
    const detail = useMovieDetail(Number(id));
    const reviews = useMovieReviews(Number(id));

    useBottomScrollListener(()=>{
        if(reviews.data 
            && reviews.data.page < reviews.data.total_pages
            && !reviews.isLoading){
            reviews.setSize(reviews.size+1);
        }
    })

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
            <MovieLayout
            poster={renderPoster(detail.data)}
            info={renderMovieInfo(detail.data)} 
            >
                <React.Fragment>
                    {/* casts */}
                    <Box pt={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Casts`}</Box>
                        </Typography>
                        {detail.data?<CastCollection castData={detail.data.credits.cast}/>
                        : <CastCollection castData={null} />
                        }
                    </Box>
                    {/* reviews */}
                    <Box pt={2} pb={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Reviews`}</Box>
                        </Typography>
                        {reviews.data? <ReviewCollection reviewData={reviews.data} />
                        : <ReviewCollection reviewData={null} />
                        }
                        {/*loading more */}
                        {reviews.isLoading && reviews.data?
                            <Box p={3} display='flext' justifyContent='center'>
                                <LinearProgress />
                            </Box>
                            :null
                        }
                    </Box>
                </React.Fragment>
            </MovieLayout>
        </PageLayout>
    );
};

export default MoviePage;