import { makeStyles, Modal, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import React from "react";
import style from "./PosterImageStyle";

import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import ImageContainer from "../../unit/ImageContainer/ImageContainer";
import { ScreenWidthProps } from "../../../props/screenSizeProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";
import { motion } from "framer-motion";
import { springTransition } from "../../../framer/Transition";

type PosterImageProps = React.ComponentProps<typeof Card> &
  ScreenWidthProps & {
    alt?: string;

    /**
     * Fixed width, otherwise give width for different size
     */
    fixedWidth?: number;

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

    hoverCursor?: string;

    enlargeEnabled?: boolean;

    /**
     * callback when image complete loaded
     */
    onImageLoaded?: () => void;

    /**
     * layoutId that used for transition between normal and enlarge
     */
    layoutId?: string;
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
const PosterImage: React.FC<PosterImageProps> = (props: PosterImageProps) => {
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
    hoverCursor = "auto",
    enlargeEnabled = false,
    onImageLoaded,
    layoutId = undefined,
    onClick,
    ...rest
  } = props;
  const theme = useTheme();
  const [isEnlarge, setIsEnlarge] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const classes = makeStyles(style)({
    fixedWidth,
    widthAtSMDown,
    widthAtSMUp,
    widthAtMDUp,
    widthAtLGUp,
    widthAtXLUp,
    theme,
    aspectRatio,
    hoverCursor,
  });

  const toggleEnlarge = () => setIsEnlarge((state) => !state);
  const handleAfterLoad = () => {
    if (onImageLoaded) onImageLoaded();
    setLoaded(true);
  };

  if (isEnlarge) {
    return (
      <Modal
        className={classes.modal}
        open={true}
        onClose={toggleEnlarge}
        disablePortal
      >
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
            <motion.div layoutId={layoutId}>{node}</motion.div>
          )}
        />
      </Modal>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ zIndex: theme.zIndex.modal + 1 }}
      animate={{ zIndex: 0 }}
      transition={springTransition(660, 33, 0.1)}
    >
      <Card
        {...rest}
        classes={{ root: classes.card }}
        onClick={enlargeEnabled ? toggleEnlarge : onClick}
      >
        <LazyLoadImage
          alt={alt}
          src={src}
          effect="black-and-white"
          width="100%"
          height="100%"
          placeholderSrc={
            loaded
              ? undefined
              : placeholderSrc
              ? placeholderSrc
              : imagePlacehoder
          }
          afterLoad={handleAfterLoad}
        />
      </Card>
    </motion.div>
  );
};

export default PosterImage;
