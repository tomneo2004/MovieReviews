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
import Typography from '@material-ui/core/Typography';
import { useMovieReviews } from '../../effects/apiFetch/movieReviews';
import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CastCollection from '../../components/movieReview/castCollection/castCollection';
import ReviewCollection from '../../components/movieReview/reviewCollection/reviewCollection';
import { Dialog, Divider } from '@material-ui/core';
import TrailerCollection from '../../components/movieReview/videoCollection/videoCollection';
import { motion } from 'framer-motion';
import { LayoutIdType } from '../../framer/layoutIdType';

const MoviePage = () => {
    const router = useRouter();
    const {id} = router.query as {[key:string]:string};
    const detail = useMovieDetail(Number(id));
    const reviews = useMovieReviews(Number(id));
    const [enlarge, setEnlarge] = React.useState<boolean>(false);

    useBottomScrollListener(()=>{
        if(reviews.data 
            && reviews.data.page < reviews.data.total_pages
            && !reviews.isLoading){
            reviews.setSize(reviews.size+1);
        }
    })

    const handleEnlarge = ()=>{
        setEnlarge(true);
    }

    const handleCloseEnlarge = ()=>{
        setEnlarge(false);
    }

    return (
        <PageLayout
        navigation={
        <motion.div layoutId={LayoutIdType.navigation}>    
            <Navigation position='sticky' hideOnScroll={true} />
        </motion.div>
        }>
            <MovieLayout
            poster={
                !detail.data? <Skeleton variant='rect' width={342} height={342 * 1.5} />
                :
                <Box onClick={handleEnlarge}>
                    <PosterImage 
                    imageURL={buildImageQuery(detail.data.poster_path, 'w342')}
                    imageWidth={342}
                    />
                </Box>
            }
            info={<MovieInfo movieDetailData={detail.data} />} 
            >
                <React.Fragment>
                    <Box p={1}><Divider variant='middle' /></Box>
                    {/* trailers */}
                    <Box pt={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Videos`}</Box>
                        </Typography>
                        {detail.data?
                        <TrailerCollection 
                        trailersData={detail.data.videos.results}
                        />
                        : <TrailerCollection trailersData={null} />
                        }
                    </Box>
                    <Box p={1}><Divider variant='middle' /></Box>
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
                    <Box p={1}><Divider variant='middle' /></Box>
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
                    <Dialog open={enlarge} onClose={handleCloseEnlarge}>
                        <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                        {
                            !detail.data? <Skeleton variant='rect' width={342} height={342 * 1.5} />
                                :
                                <PosterImage 
                                imageURL={buildImageQuery(detail.data.poster_path, 'w342')}
                                imageWidth={342}
                                />
                        }
                        </Box>
                    </Dialog>
                </React.Fragment>
            </MovieLayout>
        </PageLayout>
    );
};

export default MoviePage;