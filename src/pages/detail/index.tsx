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
            />
        </PageLayout>
    );
};

export default DetailPage;