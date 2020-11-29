import React from 'react';
import {useRouter} from 'next/router';
import {useMovieDetail} from '../../effects/movieDetail';
import Navigation from '../../components/movieReview/navigation/navigation';
import PageLayout from '../../layouts/pageLayout';
import DetailLayout from '../../layouts/detail/detailLayout';
import PosterImage from '../../components/unit/posterImage/posterImage';
import { buildImageQuery } from '../../utils/apiQueryBuilder';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import DetailInfo from '../../components/movieReview/detailInfo/detailInfo';
import getMovieRating from '../../utils/movieRating';

const DetailPage = () => {
    const router = useRouter();
    const {id} = router.query as {[key:string]:string};
    const {data, error} = useMovieDetail(Number(id))

    console.log(id, data, error);

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
            />
        </PageLayout>
    );
};

export default DetailPage;