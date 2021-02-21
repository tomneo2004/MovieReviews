import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IMoviePosterData, IVideoData } from '../../../utils/api/model/apiModelTypes';
import PosterCollection from '../PosterCollection/PosterCollection';
import VideoCollection from '../VideoCollection/VideoCollection';

enum MediaTypes {
    'video' = 'video',
    'poster' = 'poster'
}

type DataMap = {
    [MediaTypes.video]: IVideoData[];
    [MediaTypes.poster]: IMoviePosterData[]; 
}

type MediaProps = React.ComponentProps<typeof Box> & {
    defaultTab?:MediaTypes;
    trailers:IVideoData[];
    posters:IMoviePosterData[];
}

const renderMedia = (media:MediaTypes, mediaData:DataMap)=>{

    switch(media){
        case MediaTypes.video:
            return <VideoCollection trailersData={mediaData[media]} />;
        case MediaTypes.poster:
            return <PosterCollection posters={mediaData[media]} />;
        default:
            return(
                <Typography variant='h4' component='div'>
                    <Box>Oooops no media found</Box>
                </Typography>
            )
    }
}

const Media:React.FC<MediaProps> = (props:MediaProps) => {
    const {
        defaultTab = MediaTypes.video,
        trailers,
        posters,
        ...rest
    } = props;

    const [value, setValue] = React.useState<MediaTypes>(defaultTab);

    const handleTabChange = (_evt:React.ChangeEvent<{}>, value:MediaTypes)=>{
        setValue(value);
    }

    //preset 10 data
    posters.splice(9, posters.length);
    trailers.splice(9, trailers.length);
    const mediaTypeToData = React.useMemo<DataMap>(()=>{
        return {
            [MediaTypes.video]: trailers,
            [MediaTypes.poster]: posters,
        }
    }, []);

    return (
        <Box {...rest}>
            <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            >
                <Tab value={MediaTypes.video} label="Video" />
                <Tab value={MediaTypes.poster} label="Posters" />
            </Tabs>
            <Box pt={1}>
                {renderMedia(value, mediaTypeToData)}
            </Box>
        </Box>
    );
};

export default Media;