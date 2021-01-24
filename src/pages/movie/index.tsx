import React from 'react';
import {useRouter} from 'next/router';
import {useMovieDetail} from '../../effects/apiFetch/movieDetail';
import Navigation from '../../components/movieReview/navigation/navigation';
import PageLayout from '../../layouts/pageLayout';
import DetailLayout from '../../layouts/detail/detailLayout';
import PosterImage from '../../components/unit/posterImage/posterImage';
import { buildImageQuery } from '../../utils/api/query/apiQueryBuilder';
import Box from '@material-ui/core/Box';
import DetailInfo from '../../components/movieReview/detailInfo/detailInfo';
import getMovieRating from '../../utils/movieRating';
import HScroll from '../../components/unit/horizontalScroll/hScroll';
import {IMovieDetailData, IMovieReviewsData } from '../../utils/api/model/apiModelTypes';
import CastPoster from '../../components/movieReview/castPoster/castPoster';
import Typography from '@material-ui/core/Typography';
import { useMovieReviews } from '../../effects/apiFetch/movieReviews';
import ReviewCard from '../../components/movieReview/reviewCard/reviewCard';
import { dateFromUTC } from '../../utils/timeConverter';
import { partialSentenceFrom } from '../../utils/sentenceExtractor';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const renderCast = (movieDetail:IMovieDetailData)=>{
    if(!movieDetail){
        const skls = []

        for(let i:number=0; i<4; i++){
            skls.push({
                id:i,
                element: (
                    <React.Fragment>
                        <Skeleton variant='rect' width={138} height={175} />
                        <Skeleton variant='text' />
                        <Skeleton variant='text' />
                    </React.Fragment>
                )
            })
        }

        return skls;
    }

    const casts = movieDetail.credits.cast;

    return casts.map(cast=>{
        const imgQuery = buildImageQuery(cast.profile_path, 'w138_and_h175_face')
        return ({
            id:cast.cast_id,
            element: (<CastPoster
                imageSrc={imgQuery}
                name={cast.name}
                characterName={cast.character}
                imageWidth={138}
                imageHeight={175}
                />)
        })
    })
}

const renderReviews = (movieReviews:IMovieReviewsData)=>{

    if(!movieReviews){
        return (
            <Card raised>
                <Skeleton variant='text' width='30%' />
                <Skeleton variant='text' width='30%' />
                <CardContent>
                    <Skeleton variant='text' width='60%' />
                    <Skeleton variant='text' width='60%' />
                    <Skeleton variant='text' width='60%' />
                    <Skeleton variant='text' width='60%' />
                </CardContent>
            </Card>
        )
    }

    //no reviews
    if(!movieReviews.total_results){
        return (
            <Typography variant='h4' component='div'>
                <Box display='flex' justifyContent='center'>{`We could not find any reviews`}</Box>
            </Typography>
        )
    }

    const reviews = movieReviews.results;
    const fromRatingMax = 10;
    const toRatingMax = 5;
    const scale = toRatingMax / fromRatingMax;

    return reviews.map(review=>{

        const extracted = partialSentenceFrom(review.content, 4);
        let partialContent = extracted.partial + ' ...';
        if(extracted.fullyExtracted){
            partialContent = review.content;
        }

        const mdParagraph = (
            <ReactMarkdown plugins={[gfm]} children={review.content} allowDangerousHtml/>
        )
        const mdPartial = (
            <ReactMarkdown plugins={[gfm]} children={partialContent} allowDangerousHtml />
        )

        return (
            <Box key={review.id} pt={1}>    
                <ReviewCard
                authorName={review.author}
                createdAt={dateFromUTC(review.created_at)}
                paragraph={mdParagraph}
                partial={mdPartial}
                expandable={!extracted.fullyExtracted}
                rating={
                    review.author_details.rating?
                    review.author_details.rating * scale
                    :
                    0
                }
                ratingMax={toRatingMax}
                />
            </Box>)
    })
}

const renderPoster = (movieDetail:IMovieDetailData)=>{
    if(!movieDetail){
        return (
            <Skeleton variant='rect' width={342} height={342 * 2} />
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
        <DetailInfo 
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

const DetailPage = () => {
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

    // console.log(router.query);
    // console.log(id, detail.data, detail.error);
    // console.log(id, reviews.data, reviews.error);

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
            <DetailLayout
            poster={renderPoster(detail.data)}
            info={renderMovieInfo(detail.data)} 
            >
                <React.Fragment>
                    {/* casts */}
                    <Box pt={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Casts`}</Box>
                        </Typography>
                        <HScroll>
                        {()=>renderCast(detail.data)}    
                        </HScroll>
                    </Box>
                    {/* reviews */}
                    <Box pt={2} pb={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Reviews`}</Box>
                        </Typography>
                        {renderReviews(reviews.data)}
                        {/*loading more */}
                        {reviews.isLoading && reviews.data?
                            <Box p={3} display='flext' justifyContent='center'>
                                <LinearProgress />
                            </Box>
                            :null
                        }
                    </Box>
                </React.Fragment>
            </DetailLayout>
        </PageLayout>
    );
};

export default DetailPage;