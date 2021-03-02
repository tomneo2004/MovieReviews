import RootRef from "@material-ui/core/RootRef/RootRef";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import { useAnimation } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import shortid from "shortid";
import RevealFadeMotion from "../../../framer/RevealFadeMotion/RevealFadeMotion";
import { springTransition } from "../../../framer/Transition";

type PhantomTextProps = React.ComponentProps<typeof Box> & {
  /**
   * Text to display
   */
  text: string;

  /**
   * Split text into character by separator
   *
   * default `""`
   */
  separateBy?: string;

  /**
   * If no defined delay for character
   * then this value will be used
   *
   * default 0.1
   */
  charDefaultDelay?: number;

  /**
   * An object define character you
   * want to control its delay
   *
   * Use index of character in text to define.
   */
  charDelayDefs?: {
    [charIndex: string]: {
      enter: number;
      exit: number;
    };
  };

  /**
   * Text variant will pass to Material-UI Typography
   *
   * default h4
   */
  variant?:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "overline"
    | "srOnly";
};

/**
 * Component PhantomText
 *
 * Break down character and animate each character with `RevealFadeMotion`
 *
 * Controlable motion delay for character by index
 *
 * @param {PhantomTextProps} props
 */
const PhantomText: React.FC<PhantomTextProps> = (props: PhantomTextProps) => {
  const {
    text,
    separateBy = "",
    charDefaultDelay = 0.1,
    charDelayDefs = {},
    variant = "h4",
    ...rest
  } = props;

  const { ref, inView } = useInView({ triggerOnce: true });
  const motionControl = useAnimation();

  React.useEffect(() => {
    return () => motionControl.stop();
  }, []);
  React.useEffect(() => {
    if (inView) {
      motionControl.start("enter");
    }
  }, [inView]);

  if (!text) return null;

  const chars = text.split(separateBy);
  if (!chars.length) return null;

  return (
    <RootRef rootRef={ref}>
      <Box {...rest}>
        {chars.map((value, i) => {
          //white space don't count
          if (value === " ")
            return <span key={`${shortid.generate()}`}> </span>;

          const defDelay = charDelayDefs[i];

          return (
            <RevealFadeMotion
              key={`${shortid.generate()}`}
              inlineBlock
              motionControl={motionControl}
              initSize={{ width: 0, height: "fit-content" }}
              enterSize={{ width: "fit-content", height: "fit-content" }}
              exitSize={{ width: 0, height: "fit-content" }}
              enterTransition={springTransition(
                650,
                23,
                defDelay ? defDelay.enter : i * charDefaultDelay
              )}
              exitTransition={springTransition(
                300,
                30,
                defDelay ? defDelay.exit : (chars.length - i) * charDefaultDelay
              )}
            >
              <Typography variant={variant}>{value}</Typography>
            </RevealFadeMotion>
          );
        })}
      </Box>
    </RootRef>
  );
};

export default React.memo(PhantomText, (pre, next) => pre.text === next.text);
