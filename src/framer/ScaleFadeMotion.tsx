import { motion, Variants, LayoutProps, AnimationProps } from "framer-motion";
import React from "react";

type IProps = AnimationProps &
  LayoutProps & {
    children: React.ReactNode;
    enterDelay?: number;
    exitDelay?: number;
    initOpacity?: number;
    enterOpacity?: number;
    exitOpacity?: number;
    initScale?: number;
    enterScale?: number;
    exitScale?: number;
  };

/**
 * Component with scale fade animation
 * @param props
 */
const ScaleFadeMotion = (props: IProps) => {
  const {
    children,
    enterDelay = 0,
    exitDelay = 0,
    initOpacity = 0,
    enterOpacity = 1,
    exitOpacity = 0,
    initScale = 0,
    enterScale = 1,
    exitScale = 0,
    ...rest
  } = props;

  const vars: Variants = {
    init: { opacity: initOpacity, scale: initScale },
    enter: {
      opacity: enterOpacity,
      scale: enterScale,
      transition: {
        delay: enterDelay,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: exitOpacity,
      scale: exitScale,
      transition: {
        delay: exitDelay,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      variants={vars}
      initial="init"
      animate="enter"
      exit="exit"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScaleFadeMotion;
