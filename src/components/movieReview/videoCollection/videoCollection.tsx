import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IVideoData } from '../../../utils/api/model/apiModelTypes';
import { getVideoURL } from '../../../utils/api/video/videoHelper';
import HScroll from '../../unit/horizontalScroll/hScroll';
import TrailerThumbnail from '../videoThumbnail/videoThumbnail';

interface IProps {
    trailersData:IVideoData[];
    onTrailerClick?:(videoURL:string)=>void;
}

const VideoCollection = (props:IProps) => {
    const {
        trailersData,
        onTrailerClick = null,
    } = props;

    const handleTrailerClick = (videoURL:string)=>{
        if(onTrailerClick) onTrailerClick(videoURL);
    }

    if(!trailersData) return null;

    if(!trailersData.length){
        return (
            <Typography variant='h4' component='div'>
                <Box display='flex' justifyContent='center'>{`We could not find any videos`}</Box>
            </Typography>
        )
    }

    return (
        <HScroll>
        {()=>{
            return trailersData.map(trailer=>{
                const videoURL = getVideoURL(trailer.key, trailer.site);
                return ({
                    id:trailer.id,
                    element: (
                    <Box onClick={()=>handleTrailerClick(videoURL)}>    
                        <TrailerThumbnail videoSrc={videoURL} />
                    </Box>
                    )
                })
            })
        }}    
        </HScroll>
    );
};

export default VideoCollection;