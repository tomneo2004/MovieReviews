import { motion, Variants } from 'framer-motion';
import React from 'react';
import BaseMotionProps from '../BaseMotionProps/BaseMotionProps';
import { springTransition } from '../Transition';

type ScaleXMotionProps = BaseMotionProps & {
    initXScale?:number;
    enterXScale?:number;
    exitXScale?:number;
};

const ScaleXMotion:React.FC<ScaleXMotionProps> = (props:ScaleXMotionProps) => {
    const {
        isChildrenMotion = false,
        children,
        enterTransition = springTransition(350,55),
        exitTransition = springTransition(350,55),
        initXScale = 0,
        enterXScale = 1,
        exitXScale = 0,
        ...rest
    } = props;

    const vars: Variants = {
        init: {transform: `scaleX(${initXScale})`},
        enter: {transform: `scaleX(${enterXScale})`, transition: enterTransition},
        exit: {transform: `scaleX(${exitXScale})`, transition: exitTransition},
    };

    return (
        <motion.div
        variants={vars}
        initial={isChildrenMotion?'':'init'}
        animate={isChildrenMotion?'':'enter'}
        exit={isChildrenMotion?'':'exit'}
        {...rest}
        >
        {children}
        </motion.div>
    );
};

export default ScaleXMotion;