import Box from '@material-ui/core/Box';
import React from 'react';
import ProgressiveImage, {ProgressiveImageProps} from '../../unit/progressiveImage/progressiveImage';

interface IProps extends ProgressiveImageProps{
    children?:React.ReactElement;
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
        ...rest
    } = props;
    return (
        <Box position='relative' px={1} py={3}>
            <ProgressiveImage {...rest}/>
            <Box zIndex={1} position='relative'>
              {children}
            </Box>
          </Box>
    );
};

export default BackgroundImage;