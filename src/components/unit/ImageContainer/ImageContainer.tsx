import Box from "@material-ui/core/Box/Box";
import RootRef from "@material-ui/core/RootRef/RootRef";
import React from "react";
import Measure, { ContentRect } from "react-measure";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import imagePlacehoder from "../../../assets/placeholder/poster.svg";

type ImageContainerProps = React.ComponentProps<typeof Box> & {
  src?: string;
  placeholderSrc?: string;
  alt?: string;
  /**
   * A function that is called before render image
   * Function must return a React node
   *
   * function take one paramter which is img element, you can return the element
   * right away or return an element that wrapped img element
   *
   * @param {LazyLoadImage} node LazyLoadImage component
   */
  preProcess?: (node: React.ReactNode) => React.ReactNode;
  onImageLoaded?: () => void;
};

let image: HTMLImageElement;

/**
 * Component ImageContainer
 *
 * A container display an image and keep image aspect ratio
 * when screen resize
 */
const ImageContainer: React.FC<ImageContainerProps> = React.forwardRef(
  (props: ImageContainerProps, _ref) => {
    const {
      src,
      placeholderSrc,
      onImageLoaded,
      alt = "Image",
      preProcess = (node) => node,
      ...rest
    } = props;
    const [
      [imageBaseWidth, imageBaseHeight],
      setImageBaseSize,
    ] = React.useState([0, 0]);
    const [[imageWidth, imageHeight], setImageSize] = React.useState([0, 0]);
    const [
      [containerWidth, containerHeight],
      setContainerSize,
    ] = React.useState([0, 0]);

    React.useEffect(() => {
      image = new Image();
      image.onload = () => {
        setImageBaseSize([image.width, image.height]);
      };
      image.src = src;
      () => {
        image.onload = null;
      };
    }, []);

    React.useEffect(() => {
      updateImageDimension();
    }, [imageBaseWidth, imageBaseHeight, containerWidth, containerHeight]);

    const updateImageDimension = () => {
      let imgWidth = imageBaseWidth;
      let imgHeight = imageBaseHeight;

      if (containerWidth < imgWidth && imageBaseWidth) {
        imgWidth = containerWidth;
        imgHeight = (imageBaseHeight / imageBaseWidth) * imgWidth;
      }
      if (containerHeight < imgHeight && imageBaseHeight) {
        imgHeight = containerHeight;
        imgWidth = (imageBaseWidth / imageBaseHeight) * imgHeight;
      }

      setImageSize([imgWidth, imgHeight]);
    };

    const updateContainerSize = (contentRect: ContentRect) => {
      setContainerSize([contentRect.bounds.width, contentRect.bounds.height]);
    };

    return (
      <Measure bounds onResize={updateContainerSize}>
        {({ measureRef }) => {
          return (
            <RootRef rootRef={measureRef}>
              <Box {...rest}>
                {preProcess(
                  <LazyLoadImage
                    alt={alt}
                    src={src}
                    effect="blur"
                    width={imageWidth}
                    height={imageHeight}
                    placeholderSrc={
                      placeholderSrc ? placeholderSrc : imagePlacehoder
                    }
                    afterLoad={onImageLoaded}
                  />
                )}
              </Box>
            </RootRef>
          );
        }}
      </Measure>
    );
  }
);

export default ImageContainer;
