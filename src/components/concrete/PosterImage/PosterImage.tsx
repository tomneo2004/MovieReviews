import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import Modal from "@material-ui/core/Modal/Modal";
import Card from "@material-ui/core/Card/Card";
import React from "react";
import style from "./PosterImageStyle";
import imagePlacehoder from "../../../assets/placeholder/poster.svg";
import ImageContainer from "../../unit/ImageContainer/ImageContainer";
import { ScreenWidthProps } from "../../../props/screenSizeProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

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
     * pre process image when englarge
     *
     * you can wrap node in side other component and return
     *
     * @param node is a `LazyLoadImage` component
     *
     * @return ReactNode
     */
    preProcessEnlarge?: (node: React.ReactNode) => React.ReactNode;

    /**
     * pre process image when not in enlarge mode
     *
     * you can wrap node in side other component and return
     *
     * @param node is a `Card` component
     */
    preProcess?: (node: React.ReactNode) => React.ReactNode;
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
    onClick,
    preProcessEnlarge,
    preProcess = (node) => node,
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
          preProcess={preProcessEnlarge}
        />
      </Modal>
    );
  }

  return (
    <React.Fragment>
      {preProcess(
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
      )}
    </React.Fragment>
  );
};

export default PosterImage;
