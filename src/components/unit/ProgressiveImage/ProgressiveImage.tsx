import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RootRef from "@material-ui/core/RootRef/RootRef";
import clsx from "clsx";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import useLayoutEffect from "../../../effects/isomorphic/isomorphicEffect";

export type ProgressiveImageProps = React.ComponentProps<typeof Box> & {
  children?: React.ReactElement;
  /** image to fetch */
  imageSrc: string;
  backdropColor?: any;
  /** total transition time in ms
   *
   * default 5000ms
   */
  transitionTime?: number;
  /**
     * animation for background image before swapping 
     * to new new background image
     * 
     * default
     * 
     * {
            '0%':{ opacity: 0.2 },
            '100%':{ opacity:1 }
        }
     */
  keyframesAnimIn?: CSSProperties;
  /** Time function for  keyframesAnimIn
   *
   * linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit
   *
   * default linear
   */
  animInTimeFun?: string;
  /**
     * animation for new background image after swapped 
     * from old background image
     * 
     * default 
     * 
     * {
            '0%':{ opacity: 1 },
            '100%':{ opacity:0.2 }
        }
     */
  keyframesAnimOut?: CSSProperties;
  /** Time function for  keyframesAnimOut
   *
   * linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps(int,start|end)|cubic-bezier(n,n,n,n)|initial|inherit
   *
   * default linear
   */
  animOutTimeFun?: string;
  loadingIndicator?: React.ReactNode;
  bgPosition?: string;
  bgSize?: string;
};

interface IImageState {
  src: string;
  isLoading: boolean;
}

let img: HTMLImageElement;

/**
 * Component ProgressiveImage
 *
 * Progressive loading image in background and cached image
 *
 * Customizable tranistion for background image from last image to current image
 *
 * Parent element must have `relative` for position, as component is
 * absolute `position`
 *
 * @param {ProgressiveImageProps} props
 */
const ProgressiveImage: React.FC<ProgressiveImageProps> = (
  props: ProgressiveImageProps
) => {
  const {
    imageSrc,
    backdropColor,
    transitionTime = 5000,
    keyframesAnimIn = {
      "0%": { opacity: 0.2 },
      "100%": { opacity: 1 },
    },
    keyframesAnimOut = {
      "0%": { opacity: 1 },
      "100%": { opacity: 0.2 },
    },
    animInTimeFun = "linear",
    animOutTimeFun = "linear",
    loadingIndicator = null,
    bgPosition = "center top",
    bgSize = "cover",
    ...rest
  } = props;

  const [lastImageSrc, setLastImageSrc] = React.useState<string>("");
  const [currentImage, setCurrentImage] = React.useState<IImageState>({
    src: imageSrc,
    isLoading: true,
  });
  const [lastAnimating, setLastAnimating] = React.useState<boolean>(false);
  const [currentAnimating, setCurrentAnimating] = React.useState<boolean>(
    false
  );
  const lastBgRef = React.useRef<HTMLDivElement>();
  const currentBgRef = React.useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (!imageSrc) {
      setCurrentImage({ src: "", isLoading: false });
      return;
    }

    if (!img) img = new Image();

    //on image loaded
    img.onload = () => {
      setLastAnimating(true);
      setCurrentAnimating(true);
      setCurrentImage({ src: img.src, isLoading: false });
    };

    //set last image source to current one
    setLastImageSrc(currentImage.src);
    //change state to loading
    setCurrentImage((state) => ({ ...state, isLoading: true }));
    //start fetching new image
    img.src = imageSrc;

    return () => {
      img.onload = null;
    };
  }, [imageSrc]);

  useLayoutEffect(() => {
    const handleLastBgAnimStart = () => {
      setLastAnimating(true);
    };
    const handleLastBgAnimEnd = () => {
      setLastAnimating(false);
    };
    const handleCurrentBgAnimStart = () => {
      setCurrentAnimating(true);
    };
    const handleCurrentBgAnimEnd = () => {
      setCurrentAnimating(false);
    };

    lastBgRef.current.addEventListener("animationstart", handleLastBgAnimStart);
    lastBgRef.current.addEventListener("animationend", handleLastBgAnimEnd);
    currentBgRef.current.addEventListener(
      "animationstart",
      handleCurrentBgAnimStart
    );
    currentBgRef.current.addEventListener(
      "animationend",
      handleCurrentBgAnimEnd
    );

    return () => {
      lastBgRef.current.removeEventListener(
        "animationstart",
        handleLastBgAnimStart
      );
      lastBgRef.current.removeEventListener(
        "animationend",
        handleLastBgAnimEnd
      );
      currentBgRef.current.removeEventListener(
        "animationstart",
        handleCurrentBgAnimStart
      );
      currentBgRef.current.removeEventListener(
        "animationend",
        handleCurrentBgAnimEnd
      );
    };
  }, []);

  const isAnimating = () => lastAnimating || currentAnimating;

  const useStyle = makeStyles({
    "@keyframes animIn": keyframesAnimIn,
    "@keyframes animOut": keyframesAnimOut,
    commonBg: {
      backgroundOrigin: "border-box",
      backgroundPosition: bgPosition,
      backgroundSize: bgSize,
      backgroundRepeat: "no-repeat",
    },
    lastBg: {
      backgroundImage: `url(${lastImageSrc})`,
    },
    currentBg: {
      backgroundImage: `url(${currentImage.src})`,
    },
    lastBgAnim: {
      animation: `$animOut ${transitionTime / 2}ms ${animOutTimeFun}`,
      animationFillMode: "both",
    },
    currentBgAnim: {
      animation: `$animIn ${transitionTime / 2}ms ${animInTimeFun}`,
      animationFillMode: "both",
    },
    hidden: {
      visibility: "hidden",
    },
  });

  const classes = useStyle();
  const lastBgClass = clsx(classes.commonBg, classes.lastBg, {
    [classes.hidden]: !isAnimating(),
    [classes.lastBgAnim]: isAnimating() && !currentImage.isLoading,
  });
  const currentBgClass = clsx(classes.commonBg, classes.currentBg, {
    [classes.currentBgAnim]: isAnimating() && !currentImage.isLoading,
  });

  const boxProps: BoxProps = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
  };
  return (
    <Box {...rest} {...boxProps}>
      <RootRef rootRef={lastBgRef}>
        <Box
          id="last-bg"
          data-src={lastImageSrc}
          className={lastBgClass}
          {...boxProps}
        />
      </RootRef>
      <RootRef rootRef={currentBgRef}>
        <Box
          id="current-bg"
          data-src={currentImage.src}
          className={currentBgClass}
          {...boxProps}
        />
      </RootRef>
      {/* backdrop */}
      <Box id="backdrop" {...boxProps} bgcolor={backdropColor} />
      {/* loading indicator */}
      <Box id="indicator" {...boxProps}>
        {currentImage.isLoading ? loadingIndicator : null}
      </Box>
    </Box>
  );
};

export default React.memo(ProgressiveImage, (pre, next) => {
  if (!next.imageSrc) return false;
  return pre.imageSrc === next.imageSrc;
});
