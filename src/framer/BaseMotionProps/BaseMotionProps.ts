import { AnimationControls, AnimationProps, LayoutProps, MotionProps, Transition } from 'framer-motion';
import React from 'react';

type BaseMotionProps = React.ComponentProps<typeof React.Component> & AnimationProps &
  LayoutProps & MotionProps & {
    /**
     * children you want to animate on
     */
    children: React.ReactNode;

    /**
     * transition when enter/appear
     */
    enterTransition?: Transition;

    /**
     * transition when exit/disappear
     */
    exitTransition?: Transition;

    /**
     * can be orchestrated if this is true
     */
    isChildrenMotion?:boolean;

    /**
     * control your animated component
     * 
     * such as start, stop
     * 
     * https://www.framer.com/api/motion/animation/#component-animation-controls
     */
    motionControl?: AnimationControls;
};

export default BaseMotionProps;