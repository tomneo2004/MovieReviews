import React from 'react';
import {useRouter} from 'next/router';
import {useMovieDetail} from '../../effects/movieDetail';
import Navigation from '../../components/movieReview/navigation/navigation';
import PageLayout from '../../layouts/pageLayout';
import Box from '@material-ui/core/Box/Box';

const DetailPage = () => {
    const router = useRouter();
    const {id} = router.query as {[key:string]:string};
    const {data, error} = useMovieDetail(Number(id))

    console.log(data, error);

    return (
        <PageLayout
        navigation={<Navigation position='sticky' hideOnScroll={true} />}
        >
            <Box>{id}</Box>   
        </PageLayout>
    );
};

export default DetailPage;