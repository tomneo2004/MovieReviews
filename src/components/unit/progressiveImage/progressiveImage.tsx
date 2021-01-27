import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import useLayoutEffect from '../../../effects/isomorphic/isomorphicEffect';

interface IProps {
    children?:React.ReactElement;
    /** image to fetch */
    imageSrc: string;
    backdropColor?: any;
    /** total transition time in ms
     * 
     * default 5000ms
     */
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
    keyframesAnimIn?: CSSProperties;
    /** Time function for  keyframesAnimIn
     * 
     * linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit
     * 
     * default linear
     */
    animInTimeFun?:string;
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
    keyframesAnimOut?: CSSProperties;
    /** Time function for  keyframesAnimOut
     * 
     * linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit
     * 
     * default linear
     */
    animOutTimeFun?:string;
}

export type ProgressiveImageProps = IProps;

interface IImageState {
    src:string;
    isLoading:boolean;
}

let img: HTMLImageElement;

/**
 * Progressive loading image with customized transition
 * 
 * Parent element must have `relative` for position
 */
const ProgressiveImage = React.memo((props:IProps) => {
    const {
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
        animInTimeFun = 'linear',
        animOutTimeFun = 'linear',
        // ...rest
    } = props;

    const [lastImageSrc, setLastImageSrc] = React.useState<string>('');
    const [currentImage, setCurrentImage] = React.useState<IImageState>({
        src: imageSrc,
        isLoading: true,
    });

    useLayoutEffect(()=>{

        if(!imageSrc){
            setCurrentImage({src:'', isLoading:false});
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

        return ()=>{
            img.onload = null;
        }
    }, [imageSrc]);

    const useStyle = makeStyles({
        '@keyframes animIn':keyframesAnimIn,
        '@keyframes animOut':keyframesAnimOut,
        common:{
            backgroundOrigin: 'border-box',
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
        },
        staticBackground:{
            backgroundImage: `url(${lastImageSrc})`,
        },
        oldBackground:{
            backgroundImage: `url(${lastImageSrc})`,
            animation: `$animOut ${transitionTime/2}ms ${animOutTimeFun}`,
            animationFillMode: 'both'
        },
        newBackground:{
            backgroundImage: `url(${currentImage.src})`,
            animation: `$animIn ${transitionTime/2}ms ${animInTimeFun}`,
            animationFillMode: 'both'
        },
    });

    const classes = useStyle();
    const staticBgClass = clsx(classes.common, classes.staticBackground);
    const animInBgClass = clsx(classes.common, classes.newBackground);
    const animOutBgClass = clsx(classes.common, classes.oldBackground);

    const boxProps:BoxProps={
        position:'absolute',
        left:0, 
        right:0,
        top:0, 
        bottom:0,
        overflow:'hidden',
    }
    return (
        <Box {...boxProps}>
            {currentImage.isLoading?
                <Box className={staticBgClass} {...boxProps}
                />
                :
                <React.Fragment>
                    <Box className={animOutBgClass} {...boxProps}/>
                    <Box className={animInBgClass} {...boxProps}/>
                </React.Fragment>
            }
            <Box  {...boxProps} bgcolor={backdropColor} />
        </Box>
    )
},

(pre, next)=>{
    if(!next.imageSrc) return false;
    return pre.imageSrc === next.imageSrc
}
);

export default ProgressiveImage;