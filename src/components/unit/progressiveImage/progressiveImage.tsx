import React from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import style from './progressiveImageStyle';

export interface IProps extends BoxProps {
    children?:React.ReactElement;
    /** image that is small and can be loaded fast */
    preview?: string;
    /** original image  */
    image: string;
    backdropColor?: any;
    transitionTimeout?: number;
}

interface IState {
    src:string;
    isLoading:boolean;
}
export interface IStyleProps extends IState {
    transitionTimeout:number;
}

//backdrop image transition timeout
let timeout:NodeJS.Timeout;

const ProgressiveImage = (props:IProps) => {
    const {
        children,
        preview = '',
        image,
        backdropColor,
        transitionTimeout = 1000,
        ...rest
    } = props;

    const [currentImage, setCurrentImage] = React.useState<IState>({
        src: preview,
        isLoading: true,
    });

    React.useEffect(()=>{
        clearTimeout(timeout);

        if(!image){
            setCurrentImage({src: '', isLoading:false});
            return;
        }

        setCurrentImage(state=>({...state, isLoading:true}));
        const img = new Image();
        img.onload = ()=>{
            setCurrentImage({src: img.src, isLoading:false});
        }
        timeout = setTimeout(()=>{img.src = image}, transitionTimeout/2);

        return ()=>img.onload = null;
    }, [preview, image]);

    const classes = makeStyles(style)({
        src:currentImage.src, 
        isLoading:currentImage.isLoading,
        transitionTimeout:transitionTimeout/2,
    });

    return (
        <Box position='relative'>
            <Box className={classes.background} 
            position='absolute' left={0} right={0} top={0} bottom={0} 
            />
            <Box bgcolor={backdropColor} {...rest} position='relative'>{children}</Box>
        </Box>
    );
};

export default ProgressiveImage;