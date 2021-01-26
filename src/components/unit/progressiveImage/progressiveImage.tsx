import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface IProps extends BoxProps {
    children?:React.ReactElement;
    /** image to fetch */
    imageSrc: string;
    backdropColor?: any;
    /** total transition time in ms */
    transitionTime?: number;
    /**
     * animation for background image before swapping 
     * to new new background image
     * 
     * default
     * 
     * {
            '0%':{ opacity: 0.2 },
            '100%':{ opacity:1 }
        }
     */
    keyframesAnimIn?: {[key:string]:any};
    /**
     * animation for new background image after swapped 
     * from old background image
     * 
     * default 
     * 
     * {
            '0%':{ opacity: 1 },
            '100%':{ opacity:0.2 }
        }
     */
    keyframesAnimOut?: {[key:string]:any};
}

interface IImageState {
    src:string;
    isLoading:boolean;
}

let img: HTMLImageElement;

const ProgressiveImage = (props:IProps) => {
    const {
        children,
        imageSrc,
        backdropColor,
        transitionTime = 5000,
        keyframesAnimIn = {
            '0%':{ opacity: 0.2 },
            '100%':{ opacity:1 }
        },
        keyframesAnimOut = {
            '0%':{ opacity: 1 },
            '100%':{ opacity:0.2 }
        },
        ...rest
    } = props;

    const [lastImageSrc, setLastImageSrc] = React.useState<string>('');
    const [currentImage, setCurrentImage] = React.useState<IImageState>({
        src: imageSrc,
        isLoading: true,
    });

    React.useEffect(()=>{

        if(!imageSrc){
            setCurrentImage({src: '', isLoading:false});
            return;
        }

        img = new Image();
        //on image loaded
        img.onload = ()=>{
            setCurrentImage({src: img.src, isLoading:false});
        }

        //set last image source to current one
        setLastImageSrc(currentImage.src);
        //change state to loading
        setCurrentImage(state=>({...state, isLoading:true}));
        //start fetching new image
        img.src = imageSrc;

        return ()=>img.onload = null;
    }, [imageSrc]);

    const useStyle = makeStyles({
        '@keyframes animIn':keyframesAnimIn,
        '@keyframes animOut':keyframesAnimOut,
        background:{
            backgroundOrigin: 'border-box',
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
        },
        oldBackground:{
            backgroundImage: `url(${lastImageSrc})`,
            animation: `$animOut ${transitionTime/2}ms ease-out`,
        },
        newBackground:{
            backgroundImage: `url(${currentImage.src})`,
            animation: `$animIn ${transitionTime/2}ms ease-in`,
        },
    });

    const classes = useStyle();
    const animInClass = clsx(classes.background, classes.newBackground);
    const animOutClass = clsx(classes.background, classes.oldBackground);

    return (
        <Box position='relative'>
            {currentImage.isLoading?
                <Box className={animOutClass}
                position='absolute' left={0} right={0} top={0} bottom={0}
                />
                    
                :
                <React.Fragment>
                <Box className={animOutClass}
                position='absolute' left={0} right={0} top={0} bottom={0}
                />
                <Box className={animInClass} 
                position='absolute' left={0} right={0} top={0} bottom={0} 
                />
                </React.Fragment>
            }
            
            <Box bgcolor={backdropColor} {...rest} position='relative'>{children}</Box>
        </Box>
    );
};

export default ProgressiveImage;