import { makeStyles, Modal, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import style from "./PosterImageStyle";

import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import { motion } from "framer-motion";
import { springTransition } from "../../../framer/Transition";
import ImageContainer from "../../unit/ImageContainer/ImageContainer";
import { ScreenWidthProps } from "../../../props/screenSizeProps";
import { LazyLoadImage } from 'react-lazy-load-image-component';

type PosterImageProps = React.ComponentProps<typeof Card> &
  ScreenWidthProps & {
    alt?: string;

    /**
     * Fixed width, otherwise give width for different size
     */
    fixedWidth?:number;

    /**
     * Ratio between image width and height
     *
     * e.g width=150, aspectRatio=1.5, height=width * aspectRatio
     *
     * default is 1.5
     */
    aspectRatio?: number;

    /**
     * Image source URL
     */
    src?: string;

    placeholderSrc?: string;

    /**
     * Custom layoutId for AnimateSharedLayout
     *
     * https://www.framer.com/api/motion/animate-shared-layout/
     *
     * If PosterImage is in a collection among with other PosterImage
     * you nust give an unique layout id from the others otherwise behaviour
     * might be not expected
     *
     * default to null
     */
    layoutId?: string;

    hoverCursor?: string;

    enlargeEnabled?: boolean;

    /**
     * callback when image complete loaded
     */
    onImageLoaded?: ()=>void;
  };

// const renderCardMedia = (
//   src: string,
//   // imageWidth: number,
//   // aspectRatio: number,
//   placeholder: string,
//   cardMediaStyle: string,
//   alt: string
// ) => {
//   return (
//     <CardMedia
//       className={cardMediaStyle}
//       component="img"
//       alt={alt}
//       // width={imageWidth}
//       // height={imageWidth * aspectRatio}
//       height="100%"
//       src={src ? src : placeholder}
//     />
//   );
// };

/**
 * Component PosterImage
 *
 * Display image with Material-UI Card
 *
 * Image can be enlarged when clicked
 *
 * @param {PosterImageProps} props
 */
const PosterImage: React.FC<PosterImageProps> = React.forwardRef(
  (props: PosterImageProps, _ref) => {
    const {
      alt = "image",
      src = "",
      placeholderSrc,
      fixedWidth,
      widthAtSMDown = 300,
      widthAtSMUp = 320,
      widthAtMDUp = 350,
      widthAtLGUp = 400,
      widthAtXLUp = 450,
      aspectRatio = 1.5,
      layoutId = null,
      hoverCursor = "auto",
      enlargeEnabled = false,
      onImageLoaded,
      onClick,
      ...rest
    } = props;
    const theme = useTheme();
    const [isEnlarge, setIsEnlarge] = React.useState<boolean>(false);
    const classes = makeStyles(style)({
      fixedWidth,
      widthAtSMDown,
      widthAtSMUp,
      widthAtMDUp,
      widthAtLGUp,
      widthAtXLUp,
      theme,
      aspectRatio,
      cursor: hoverCursor,
    });

    const toggleEnlarge = () => setIsEnlarge((state) => !state);

    if (isEnlarge) {
      return (
        <Modal className={classes.modal} open={true} onClose={toggleEnlarge}>
          <ImageContainer
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            src={src}
            alt={alt}
            onClick={toggleEnlarge}
            postProcess={(node) => (
              <motion.div
                layoutId={layoutId}
                layout
                transition={springTransition()}
              >
                {node}
              </motion.div>
            )}
          />
        </Modal>
      );
    }

    return (
      <motion.div
        layoutId={layoutId}
        layout
        initial={{ visibility: "visible" }}
        transition={springTransition()}
        style={{
          position: "relative",
        }}
      >
        <Card
          {...rest}
          classes={{ root: classes.card }}
          onClick={enlargeEnabled ? toggleEnlarge : onClick}
        >
          {/* {renderCardMedia(src, imagePlacehoder, classes.cardMedia, alt)} */}
          <LazyLoadImage
          alt={alt}
          src={src}
          effect='blur'
          width='100%'
          height='100%'
          placeholderSrc={placeholderSrc?placeholderSrc:imagePlacehoder}
          afterLoad={onImageLoaded}
          />
        </Card>
      </motion.div>
    );
  }
);

export default PosterImage;
