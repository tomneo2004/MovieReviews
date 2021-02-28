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
    imageURL?: string;

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
  };

// const renderCardMedia = (
//   imageURL: string,
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
//       src={imageURL ? imageURL : placeholder}
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
      imageURL = "",
      widthAtSMDown = 300,
      widthAtSMUp = 320,
      widthAtMDUp = 350,
      widthAtLGUp = 400,
      widthAtXLUp = 450,
      aspectRatio = 1.5,
      layoutId = null,
      hoverCursor = "auto",
      enlargeEnabled = false,
      onClick,
      ...rest
    } = props;
    const theme = useTheme();
    const [isEnlarge, setIsEnlarge] = React.useState<boolean>(false);
    const classes = makeStyles(style)({
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
            src={imageURL}
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
          {/* {renderCardMedia(imageURL, imagePlacehoder, classes.cardMedia, alt)} */}
          <LazyLoadImage
          alt={alt}
          src={imageURL}
          effect='blur'
          width='100%'
          height='100%'
          placeholderSrc={imagePlacehoder}
          />
        </Card>
      </motion.div>
    );
  }
);

export default PosterImage;
