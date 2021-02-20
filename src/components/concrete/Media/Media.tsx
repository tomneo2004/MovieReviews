import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IVideoData } from '../../../utils/api/model/apiModelTypes';
import VideoCollection from '../VideoCollection/VideoCollection';

enum MediaTypes {
    'video' = 'video',
    'gallery' = 'gallery'
}

type DataMap = {[key:string]: any}

type MediaProps = React.ComponentProps<typeof Box> & {
    defaultTab?:MediaTypes;
    trailers:IVideoData[];
    gallery:[];
}

const renderMedia = (media:MediaTypes, mediaData:DataMap)=>{
    const data = mediaData[media];
    if(!data) return null;

    switch(media){
        case MediaTypes.video:
            return <VideoCollection trailersData={data} />;
        case MediaTypes.gallery:
            return <Box>Under development</Box>;
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
        gallery,
        ...rest
    } = props;

    const [value, setValue] = React.useState<MediaTypes>(defaultTab);

    const handleTabChange = (_evt:React.ChangeEvent<{}>, value:MediaTypes)=>{
        setValue(value);
    }

    const mediaTypeToData = React.useMemo<DataMap>(()=>{
        return {
            [MediaTypes.video]: trailers,
            [MediaTypes.gallery]: gallery
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
                <Tab value={MediaTypes.gallery} label="Gallery" />
            </Tabs>
            <Box pt={1}>
                {renderMedia(value, mediaTypeToData)}
            </Box>
        </Box>
    );
};

export default Media;