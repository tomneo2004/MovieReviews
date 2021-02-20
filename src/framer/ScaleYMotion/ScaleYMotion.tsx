import { motion, Variants } from 'framer-motion';
import React from 'react';
import BaseMotionProps from '../BaseMotionProps/BaseMotionProps';
import { springTransition } from '../Transition';

type ScaleYMotionProps = BaseMotionProps & {
    initYScale?:number;
    enteYXScale?:number;
    exitYScale?:number;
};

const ScaleYMotion:React.FC<ScaleYMotionProps> = (props:ScaleYMotionProps) => {
    const {
        isChildrenMotion = false,
        motionControl,
        children,
        enterTransition = springTransition(350,55),
        exitTransition = springTransition(350,55),
        initYScale = 0,
        enteYXScale = 1,
        exitYScale = 0,
        ...rest
    } = props;

    const vars: Variants = {
        init: {transform: `scaleY(${initYScale})`},
        enter: {transform: `scaleY(${enteYXScale})`, transition: enterTransition},
        exit: {transform: `scaleY(${exitYScale})`, transition: exitTransition},
    };

    return (
        <motion.div
        variants={vars}
        initial={isChildrenMotion?'':'init'}
        animate={isChildrenMotion?'': motionControl? motionControl : 'enter'}
        exit={isChildrenMotion?'':'exit'}
        {...rest}
        >
        {children}
        </motion.div>
    );
};

export default ScaleYMotion;