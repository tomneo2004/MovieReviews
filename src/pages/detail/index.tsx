import React from 'react';
import {useRouter} from 'next/router';
import {useMovieDetail} from '../../effects/apiFetch/movieDetail';
import Navigation from '../../components/movieReview/navigation/navigation';
import PageLayout from '../../layouts/pageLayout';
import DetailLayout from '../../layouts/detail/detailLayout';
import PosterImage from '../../components/unit/posterImage/posterImage';
import { buildImageQuery } from '../../utils/api/query/apiQueryBuilder';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import DetailInfo from '../../components/movieReview/detailInfo/detailInfo';
import getMovieRating from '../../utils/movieRating';
import HScroll from '../../components/unit/horizontalScroll/hScroll';
import { ICastData, IReviewData } from '../../utils/api/model/apiModelTypes';
import CastPoster from '../../components/movieReview/castPoster/castPoster';
import Typography from '@material-ui/core/Typography';
import { useMovieReviews } from '../../effects/apiFetch/movieReviews';
import ReviewCard from '../../components/movieReview/reviewCard/reviewCard';
import { dateFromUTC } from '../../utils/timeConverter';
import { partialSentenceFrom } from '../../utils/sentenceExtractor';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const transformCastToPoster = (casts:ICastData[])=>{
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

const transformReviewsToReviewCard = (reviews:IReviewData[])=>{
    if(!reviews) return null;

    const fromRatingMax = 10;
    const toRatingMax = 5;
    const scale = toRatingMax / fromRatingMax;

    return reviews.map(review=>{

        const extracted = partialSentenceFrom(review.content, 4);
        const partialContent = extracted.partial + ' ...';
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

const DetailPage = () => {
    const router = useRouter();
    const {id} = router.query as {[key:string]:string};
    const {data, error} = useMovieDetail(Number(id));
    const reviews = useMovieReviews(Number(id), 1);

    console.log(router.query);
    console.log(id, data, error);
    console.log(id, reviews.data, reviews.error);

    if(!data){
        return (
            <PageLayout
            navigation={<Navigation position='sticky' hideOnScroll={true} />}
            >
                <Box display='flex' justifyContent='center' alignItems='center' p={2}>
                    <CircularProgress />
                </Box>
            </PageLayout>
        )
    }

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
            <DetailLayout
            poster={
                <PosterImage 
                imageURL={buildImageQuery(data.poster_path, 'w342')}
                imageWidth={342}
                />
            }
            info={
                <DetailInfo 
                title={data.title}
                releaseDate={data.release_date}
                length={data.runtime}
                genre={data.genres}
                userScore={getMovieRating(data.vote_count, data.vote_average)}
                tagline={data.tagline}
                overview={data.overview}
                />
            } 
            >
                <React.Fragment>
                    {/* casts */}
                    <Box pt={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Casts`}</Box>
                        </Typography>
                        <HScroll>
                        {()=>transformCastToPoster(data.credits.cast)}    
                        </HScroll>
                    </Box>
                    {/* reviews */}
                    <Box pt={2}>
                        <Typography component='div' variant='h4'>
                            <Box pl={2} fontWeight={600}>{`Reviews`}</Box>
                        </Typography>
                        {
                            reviews.data?
                            transformReviewsToReviewCard(reviews.data.results)
                            :
                            null
                        }
                    </Box>
                </React.Fragment>
            </DetailLayout>
        </PageLayout>
    );
};

export default DetailPage;