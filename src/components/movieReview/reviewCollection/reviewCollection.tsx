import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IMovieReviewsData } from '../../../utils/api/model/apiModelTypes';
import { partialSentenceFrom } from '../../../utils/sentenceExtractor';
import gfm from 'remark-gfm';
import ReviewCard from '../reviewCard/reviewCard';
import { dateFromUTC } from '../../../utils/timeConverter';

interface IProps {
    reviewData:IMovieReviewsData;
}

const renderSkeletons = ()=>{
    
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
const ReviewCollection = (props:IProps) => {
    const {reviewData} = props;

    if(!reviewData) return renderSkeletons();

    //no reviews
    if(!reviewData.total_results){
        return (
            <Typography variant='h4' component='div'>
                <Box display='flex' justifyContent='center'>{`We could not find any reviews`}</Box>
            </Typography>
        )
    }

    const reviews = reviewData.results;
    const fromRatingMax = 10;
    const toRatingMax = 5;
    const scale = toRatingMax / fromRatingMax;

    return (
        <React.Fragment>
        {
            reviews.map(review=>{

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
        </React.Fragment>
    )
};

export default ReviewCollection;