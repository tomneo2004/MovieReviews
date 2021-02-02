import { Box, Dialog, DialogProps, makeStyles } from '@material-ui/core';
import React from 'react';
import ReactPlayer from 'react-player';
import style from './videoPlayerStyle';

interface IProps extends DialogProps{
    videoSrc:string;
}
const VideoPlayer = (props:IProps) => {
    const {
        videoSrc,
        ...rest
    } = props;

    const classes = makeStyles(style)()

    return (
        <Dialog classes={{paper:classes.paper}} {...rest}>
            <Box display='flex' justifyContent='center' alignItems='center' p={1}  height='100%'>
                <ReactPlayer
                url={videoSrc}
                width='100%'
                height='100%'
                controls
                />
            </Box>
        </Dialog>
    );
};

export default VideoPlayer;