import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { IVideoData } from '../../../utils/api/model/apiModelTypes';
import { getVideoURL } from '../../../utils/api/video/videoHelper';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

type GridPosterImageProps = React.ComponentProps<typeof Grid> & {
    videoData:IVideoData[];
}

const GridPosterImage:React.FC<GridPosterImageProps> = (props:GridPosterImageProps) => {
    const {
        videoData,
        ...rest
    } = props;

    return (
        <Grid container {...rest}>
        {
            videoData.map(video=>{
                const videoURL = getVideoURL(video.key, video.site);
                return (
                    <Grid key={video.id} item xs>
                        <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                        >
                            <VideoPlayer videoSrc={videoURL} videoTitle={video.name} />
                        </Box>
                    </Grid>
                )
            })
        }
        </Grid>
    );
};

export default React.memo(GridPosterImage, (pre, next)=>{
    return pre.videoData === next.videoData;
});