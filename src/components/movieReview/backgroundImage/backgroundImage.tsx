import Box from '@material-ui/core/Box';
import React from 'react';
import ProgressiveImage, {ProgressiveImageProps} from '../../unit/progressiveImage/progressiveImage';

interface IProps extends ProgressiveImageProps{
    children:React.ReactElement;
}

/**
 * Component warp around ProgressiveImage component
 *
 * Render image as background image and
 * take a children component render on top
 */
const BackgroundImage = (props:IProps) => {
    const {
        children,
        imageSrc,
        keyframesAnimIn = {
            '0%':{transform:'translate(100%)'},
            '100%':{transform:'translate(0%)'}
        },
        keyframesAnimOut = {
            '0%':{transform:'translate(0%)'},
            '100%':{transform:'translate(-100%)'}
        },
        animInTimeFun = 'ease',
        animOutTimeFun = 'ease',
    } = props;
    return (
        <Box position='relative' px={1} py={3}>
            <ProgressiveImage imageSrc={imageSrc} 
            backdropColor='trendingBackdrop.main'
            keyframesAnimOut={keyframesAnimOut}
            animOutTimeFun={animOutTimeFun}
            keyframesAnimIn={keyframesAnimIn}
            animInTimeFun={animInTimeFun}
            />
            <Box position='relative'>
              {children}
            </Box>
          </Box>
    );
};

export default BackgroundImage;