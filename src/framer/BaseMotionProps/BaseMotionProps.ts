import { AnimationProps, LayoutProps, MotionProps, Transition } from 'framer-motion';
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
    isChildrenMotion?:boolean
};

export default BaseMotionProps;