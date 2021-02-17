import { makeStyles, Modal } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import React from "react";
import style from "./PosterImageStyle";

import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import Box from "@material-ui/core/Box/Box";
import { motion } from "framer-motion";
import { LayoutIdTypes } from "../../../framer/LayoutIdTypes";
import { springTransition } from "../../../framer/Transition";

type PosterImageProps = React.ComponentProps<typeof Card> & {
  alt?: string;

  /**
   * Image width
   */
  imageWidth: number;

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
   * Width of image when enlarge
   * 
   * Given a number to enable enlarge otherwise null
   * 
   * default null
   */
  enlargeWidth?: number;

  /**
   * Aspect ratio for enlarged image
   * 
   * default as same as aspectRatio
   */
  enlargeAspectRatio?: number;
};

/**
 * Component PosterImage
 *
 * Display image with Material-UI Card
 * 
 * Image can be enlarged when clicked
 *
 * @param {PosterImageProps} props
 */
const PosterImage: React.FC<PosterImageProps> = React.forwardRef((props: PosterImageProps, _ref) => {
  const {
    alt = "image",
    imageURL = "",
    imageWidth,
    aspectRatio = 1.5,
    enlargeWidth = null,
    enlargeAspectRatio = aspectRatio,
    ...rest
  } = props;
  const [enlarge, setEnlarge] = React.useState<boolean>(false);
  const classes = makeStyles(style)();

  const motionDivStyle = {
    width: "fit-content",
    height: "fit-content",
    outline: "none",
  };

  const toggleEnlarge = () => setEnlarge((state) => !state);

  if(!enlargeWidth){
    return (
      <Box position="relative" minWidth={imageWidth} maxWidth={imageWidth}>
        <Card {...rest}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            alt={alt}
            width={imageWidth}
            height={imageWidth * aspectRatio}
            src={imageURL ? imageURL : imagePlacehoder}
          />
        </Card>
      </Box>
    )
  }

  if(enlarge){
    return (
      <Modal
        className={classes.modal}
        open={enlarge}
        onClose={toggleEnlarge}
      >
        <motion.div
          layoutId={LayoutIdTypes.moviePosterImage}
          style={motionDivStyle}
          transition={springTransition()}
        >
          <Card {...rest} onClick={toggleEnlarge}>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              alt={alt}
              width={enlargeWidth}
              height={enlargeWidth * enlargeAspectRatio}
              src={imageURL ? imageURL : imagePlacehoder}
            />
          </Card>
        </motion.div>
      </Modal>
    )
  }

  return (
    <Box position="relative" minWidth={imageWidth} maxWidth={imageWidth}>
      <motion.div
          layoutId={LayoutIdTypes.moviePosterImage}
          style={motionDivStyle}
          transition={springTransition()}
      >
      <Card {...rest} onClick={toggleEnlarge}>
        <CardMedia
          className={classes.cardMedia}
          component="img"
          alt={alt}
          width={imageWidth}
          height={imageWidth * aspectRatio}
          src={imageURL ? imageURL : imagePlacehoder}
        />
      </Card>
      </motion.div>
    </Box>
  );
});

export default PosterImage;
