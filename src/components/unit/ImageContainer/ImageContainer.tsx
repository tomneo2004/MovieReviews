import Box from '@material-ui/core/Box';
import RootRef from '@material-ui/core/RootRef';
import React from 'react';
import Measure, { ContentRect } from 'react-measure';

type ImageContainerProps = React.ComponentProps<typeof Box> & {
    src: string;
}

let image:HTMLImageElement;

const ImageContainer:React.FC<ImageContainerProps> = React.forwardRef((props:ImageContainerProps, _ref) => {
    const {
        src,
        ...rest
    } = props;
    const [[imageBaseWidth, imageBaseHeight], setImageBaseSize] = React.useState([0,0]);
    const [[imageWidth, imageHeight], setImageSize] = React.useState([0,0]);

    React.useEffect(()=>{
        image = new Image();
        image.onload = ()=>{
            setImageBaseSize([image.width, image.height]);
        }
        image.src = src;
        ()=>{image.onload = null;}
    }, []);

    const updateImageDimension = (contentRect:ContentRect)=>{
        let imgWidth = imageBaseWidth;
        let imgHeight = imageBaseHeight;
        const containerWidth = contentRect.bounds.width;
        const containerHeight = contentRect.bounds.height;
        
        if(containerWidth < imgWidth && imageBaseWidth){
            imgWidth = containerWidth;
            imgHeight = imageBaseHeight / imageBaseWidth * imgWidth;
        }
        if(containerHeight < imgHeight && imageBaseHeight){
            imgHeight = containerHeight;
            imgWidth = imageBaseWidth / imageBaseHeight * imgHeight;
        }

        setImageSize([imgWidth, imgHeight]);
    }

    return (
        <Measure
        bounds
        onResize={updateImageDimension}
        >
        {
            ({measureRef})=>{

                return (
                    <RootRef rootRef={measureRef}>
                        <Box {...rest}>
                            <img src={src} style={{width:imageWidth, height:imageHeight}} />
                        </Box>
                    </RootRef>
                )
            }
        }    
        
        </Measure>
    );
});

export default ImageContainer;