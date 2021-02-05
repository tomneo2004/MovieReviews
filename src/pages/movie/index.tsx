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
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import CastCollection from '../../components/movieReview/castCollection/castCollection';
import ReviewCollection from '../../components/movieReview/reviewCollection/reviewCollection';
import { Divider, makeStyles, Modal } from '@material-ui/core';
import TrailerCollection from '../../components/movieReview/videoCollection/videoCollection';
import { motion } from 'framer-motion';
import { LayoutIdTypes } from '../../framer/LayoutIdTypes';
import { springTransition } from '../../framer/Transition';

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

    const classes = makeStyles({
        modal:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
        pointer:{
            cursor:'pointer',
        }
    })();

    const motionDivStyle = {
        width:'fit-content',
        height:'fit-content',
        outline:'none'
    }

    const toggleEnlarge = ()=>setEnlarge(state=>!state);

    return (
        <PageLayout
        navigation={
        <motion.div layoutId={LayoutIdTypes.navigation}>    
            <Navigation position='sticky' hideOnScroll={true} />
        </motion.div>
        }>
            <MovieLayout
            poster={
                !detail.data?<Skeleton variant='rect' width={342} height={342 * 1.5} />
                :
                enlarge? null:
                <motion.div layoutId={LayoutIdTypes.moviePosterImage}
                style={motionDivStyle} transition={springTransition()}>
                    <PosterImage 
                    className={classes.pointer}
                    onClick={toggleEnlarge}
                    imageURL={buildImageQuery(detail.data.poster_path, 'w342')}
                    imageWidth={342}
                    />
                </motion.div>
            }
            info={
                <MovieInfo movieDetailData={detail.data} />    
            }>
                <React.Fragment>
                    {/* trailers */}
                    <Box p={1}><Divider variant='middle' /></Box>
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
                    {/* casts */}
                    <Box p={1}><Divider variant='middle' /></Box>
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
                        {reviews.data? 
                            <ReviewCollection reviewData={reviews.data} 
                            isLoadingMore={reviews.isLoading} />
                            : 
                            <ReviewCollection reviewData={null} />
                        }
                    </Box>
                    {/* enlarge image */}
                    {
                    !detail.data || !enlarge? null:
                    <Modal className={classes.modal} open={enlarge} onClose={toggleEnlarge}>
                        <motion.div layoutId={LayoutIdTypes.moviePosterImage} 
                        style={motionDivStyle} transition={springTransition()}>
                            <PosterImage
                            raised
                            onClick={toggleEnlarge} 
                            imageURL={buildImageQuery(detail.data.poster_path, 'w342')}
                            imageWidth={342}
                            />
                        </motion.div>
                    </Modal>
                    }
                </React.Fragment>
            </MovieLayout>
        </PageLayout>
    );
};

export default MoviePage;