import React from 'react';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useNoembed } from '../../../effects/apiFetch/noembed';

interface IThumbProps{
    videoSrc: string;
}
let img:HTMLImageElement;

const renderSkeletons = ()=>{
    return (
        <Card>
            <Skeleton variant='rect' width='300px' height='350px' />
        </Card>
    )
}

const VideoThumbnail = (props:IThumbProps)=>{
    const {videoSrc} = props;
    const {data, error} = useNoembed(videoSrc);
    const [ready, setReady] = React.useState<boolean>(false);

    React.useEffect(()=>{
        if(!data){
            setReady(false);
            return;
        };

        img = new Image();
        img.onload = ()=>{
            setReady(true);
        }
        setReady(false)
        img.src = data.thumbnail_url;

        return ()=>{
            if(img) img.onload=null;
        }
    },[data])
    
    if(!ready || error || !data) return renderSkeletons();

    return(
        <Card>
            <CardActionArea>
                <CardMedia src={data.thumbnail_url} component='img' />
            </CardActionArea>
        </Card>
    )
}

export default VideoThumbnail;