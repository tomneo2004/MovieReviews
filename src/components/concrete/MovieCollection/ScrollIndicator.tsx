import React from 'react';
import ScaleMotion from '../../../framer/ScaleMotion/ScaleMotion';
import { springTransition } from '../../../framer/Transition';

type ScrollIndicatorProps = React.ComponentProps<typeof ScaleMotion> & {
    direction: 'left' | 'right';
}

const ScrollIndicator:React.FC<ScrollIndicatorProps> = (props:ScrollIndicatorProps) => {
    const {
        children,
        direction,
        ...rest
    } = props;

    return (
            <ScaleMotion
            style={{
            display:'flex', justifyContent:'center', alignItems:'center', 
            position:'absolute',top:'50%', left:direction === 'left'?0:'auto',
            right: direction === 'right'?0:'auto' 
            }}
            enterTransition={springTransition(600, 15, 0.1)}
            exitTransition={springTransition(600, 15, 0.1)}
            {...rest}
            >
            {children}
            </ScaleMotion>
    );
};


export default ScrollIndicator;