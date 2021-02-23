import { motion, Variants } from "framer-motion";
import React from "react";
import BaseMotionProps from "../BaseMotionProps/BaseMotionProps";
import { springTransition } from "../Transition";

type FadeMotionProps = BaseMotionProps & {
  initOpacity?: number;
  enterOpacity?: number;
  exitOpacity?: number;
};

const FadeMotion: React.FC<FadeMotionProps> = (props: FadeMotionProps) => {
  const {
    isChildrenMotion = false,
    motionControl,
    children,
    enterTransition = springTransition(350, 55),
    exitTransition = springTransition(350, 55),
    initOpacity = 0,
    enterOpacity = 1,
    exitOpacity = 0,
    ...rest
  } = props;

  const vars: Variants = {
    init: { opacity: initOpacity },
    enter: { opacity: enterOpacity, transition: enterTransition },
    exit: { opacity: exitOpacity, transition: exitTransition },
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

export default FadeMotion;
