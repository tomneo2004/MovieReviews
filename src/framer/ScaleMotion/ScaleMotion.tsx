import { motion, Variants } from "framer-motion";
import React from "react";
import BaseMotionProps from "../BaseMotionProps/BaseMotionProps";
import { springTransition } from "../Transition";

type ScaleMotionProps = BaseMotionProps & {
  initScale?: number;
  enterScale?: number;
  exitScale?: number;
};

const ScaleMotion: React.FC<ScaleMotionProps> = (props: ScaleMotionProps) => {
  const {
    isChildrenMotion = false,
    motionControl,
    children,
    enterTransition = springTransition(350, 55),
    exitTransition = springTransition(350, 55),
    initScale = 0,
    enterScale = 1,
    exitScale = 0,
    ...rest
  } = props;

  const vars: Variants = {
    init: { transform: `scale(${initScale}, ${initScale})` },
    enter: {
      transform: `scale(${enterScale}, ${enterScale})`,
      transition: enterTransition,
    },
    exit: {
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

export default ScaleMotion;
