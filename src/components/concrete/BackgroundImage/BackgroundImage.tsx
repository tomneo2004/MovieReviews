import Box from "@material-ui/core/Box";
import React from "react";
import ProgressiveImage, { ProgressiveImageProps } from "../../unit/ProgressiveImage/ProgressiveImage";

type BackgroundImageProps = ProgressiveImageProps;

/**
 * Component warp around ProgressiveImage component
 *
 * Render image as background image and
 * take a children component render on top
 *
 * @param {BackgroundImageProps} props
 */
const BackgroundImage: React.FC<BackgroundImageProps> = (
  props: BackgroundImageProps
) => {
  const { children, id, ...rest } = props;
  return (
    <Box id={id} position="relative">
      <ProgressiveImage {...rest} />
      <Box zIndex={1} position="relative">
        {children}
      </Box>
    </Box>
  );
};

export default BackgroundImage;
