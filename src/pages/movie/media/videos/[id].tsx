import { LinearProgress, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import GridVideoPlayer from '../../../../components/concrete/GridVideoPlayer/GridVideoPlayer';
import PhantomText from '../../../../components/concrete/PhantomText/PhantomText';
import SectionHeader from '../../../../components/concrete/SectionHeader/SectionHeader';
import { useMovieVideos } from '../../../../effects/apiFetch/movieVideos';
import PageLayout from '../../../../layouts/pageLayout';

const VideosPage = ()=>{
    const theme = useTheme();
    const router = useRouter();
    const {id} = router.query;
    const {data, error, isLoading} = useMovieVideos(id as string);

    return (
        <PageLayout p={2}>
        {isLoading? <LinearProgress /> :
            <React.Fragment>
            <SectionHeader
            headerAlign = 'center'
            bgcolor={theme.palette.primary.main}
            header={
                <PhantomText height='100%' bgcolor={theme.palette.primary.light} px={1}
                text='Videos' 
                charDelayDefs={{
                  0:{enter:1, exit:0},
                  1:{enter:1.2, exit:0},
                  2:{enter:1.4, exit:0},
                  3:{enter:1.6, exit:0},
                  4:{enter:1.8, exit:0},
                  5:{enter:2, exit:0},
                }}
                />
            }
            />
            <GridVideoPlayer videoData={data} />
            </React.Fragment>
        }
        </PageLayout>
    )
}

export default VideosPage;