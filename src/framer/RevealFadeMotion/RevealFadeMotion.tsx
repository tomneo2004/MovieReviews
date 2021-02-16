import { AnimationProps, LayoutProps, motion, Transition, Variants } from 'framer-motion';
import React from 'react';
import { springTransition } from '../Transition';

export type RFMSize = {width:string | number, height:string | number};

type RevealFadeMotionProps = AnimationProps &
  LayoutProps & {
    children: React.ReactNode;
    enterTransition?: Transition;
    exitTransition?: Transition;
    initOpacity?:number;
    enterOpacity?:number;
    exitOpacity?:number;
    initSize?:RFMSize;
    enterSize?:RFMSize;
    exitSize?:RFMSize;
};

/**
 * Motion Component
 * 
 * Opacity motion
 * 
 * Width and Height motion, give `fit-content` to size for width and height if you
 * don't know the size of content
 * 
 * @param {RevealFadeMotionProps} props 
 */
const RevealFadeMotion:React.FC<RevealFadeMotionProps>  = (props:RevealFadeMotionProps) => {
    const {
        children,
        enterTransition = springTransition(350,55),
        exitTransition = springTransition(350,55),
        initOpacity = 0,
        enterOpacity = 1,
        exitOpacity = 0,
        initSize = {width:'fit-content', height:0},
        enterSize = {width:'fit-content', height:'fit-content'},
        exitSize = {width:'fit-content', height:0}
    } = props;

    const vars: Variants = {
        init: {width: initSize.width, height: initSize.height, opacity: initOpacity},
        enter: {width: enterSize.width, height: enterSize.height, opacity: enterOpacity, transition: enterTransition},
        exit: {width: exitSize.width, height: exitSize.height, opacity: exitOpacity, transition: exitTransition},
    };

    return (
        <motion.div
        variants={vars}
        initial='init'
        animate='enter'
        exit='exit'
        style={{overflow:'hidden'}}
        layout='position'
        >
        {children}
        </motion.div>
    );
};

export default RevealFadeMotion;