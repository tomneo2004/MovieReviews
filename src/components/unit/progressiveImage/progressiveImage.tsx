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
}

interface IState {
    src:string;
    isLoading:boolean;
}
export interface IStyleProps extends IState {}

const ProgressiveImage = (props:IProps) => {
    const {
        children,
        preview = '',
        image,
        backdropColor,
        ...rest
    } = props;

    const [currentImage, setCurrentImage] = React.useState<IState>({
        src: preview,
        isLoading: true,
    });

    React.useEffect(()=>{
        if(image){
            const img = new Image();
            img.onload = ()=>{
                setCurrentImage({src: img.src, isLoading:false});
            }
            img.src = image;

            return ()=>img.onload = null;
        }

        setCurrentImage({src: '', isLoading:false});
        
    }, [image]);

    const classes = makeStyles(style)({src:currentImage.src, isLoading:currentImage.isLoading});

    return (
        <Box className={classes.background}>
            <Box bgcolor={backdropColor} {...rest}>{children}</Box>
        </Box>
    );
};

export default ProgressiveImage;