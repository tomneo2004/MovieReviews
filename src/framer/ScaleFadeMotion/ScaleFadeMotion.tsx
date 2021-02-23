import { motion, Variants } from "framer-motion";
import React from "react";
import BaseMotionProps from "../BaseMotionProps/BaseMotionProps";
import { springTransition } from "../Transition";

type ScaleFadeMotionProps = BaseMotionProps & {
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
const ScaleFadeMotion: React.FC<ScaleFadeMotionProps> = (
  props: ScaleFadeMotionProps
) => {
  const {
    isChildrenMotion = false,
    motionControl,
    children,
    enterTransition = springTransition(350, 55),
    exitTransition = springTransition(350, 55),
    initOpacity = 0,
    enterOpacity = 1,
    exitOpacity = 0,
    initScale = 0,
    enterScale = 1,
    exitScale = 0,
    ...rest
  } = props;

  const vars: Variants = {
    init: {
      opacity: initOpacity,
      transform: `scale(${initScale}, ${initScale})`,
    },
    enter: {
      opacity: enterOpacity,
      transform: `scale(${enterScale}, ${enterScale})`,
      transition: enterTransition,
    },
    exit: {
      opacity: exitOpacity,
      transform: `scale(${exitScale}, ${exitScale})`,
      transition: exitTransition,
    },
  };

  return (
    <motion.div
      variants={vars}
      initial={isChildrenMotion ? "" : "init"}
      animate={isChildrenMotion ? "" : motionControl ? motionControl : "enter"}
      exit={isChildrenMotion ? "" : "exit"}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScaleFadeMotion;
