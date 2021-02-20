import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { AnimatePresence, Transition, useAnimation } from 'framer-motion';
import React from 'react';
import shortid from 'shortid';
import RevealFadeMotion, { RFMSize } from '../../../framer/RevealFadeMotion/RevealFadeMotion';
import { springTransition } from '../../../framer/Transition';

export type RFCMotionOptions = {
    /** direction of motion */
    axis: 'x'|'y'|'both',
    /**
     * indentation from last sentence
     * 
     * also can think it as padding left
     * 
     * default 0
     */
    indent?: number | string,
    /** motion opacity */
    opacity: {from:number, to:number},
    /** Transition for enter */
    enterTranistion: Transition,
    /** Transition for exit */
    exitTranistion: Transition
}
export type RFCText = {
    text:React.ReactNode;
    motionOptions?:RFCMotionOptions
}

export type RFCTextGroup = RFCText[];

type RFCarouselProps = React.ComponentProps<typeof Box> & {
    /**
     * How long is a group be presented
     * before preseting next group
     * 
     * number in ms
     * 
     * default 5000 ms
     */
    interval?: number;

    /**
     * delay start carousel looping 
     * 
     * default 4000 ms
     */
    startDelay?: number;

    /**
     * Index of group will be presented at beginning
     * 
     * default 0
     */
    defaultGroupIndex?: number;

    /**
     * A set of group of text and each text can be defined
     * with a motion 
     */
    textSet: RFCTextGroup[];
    variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | "srOnly";
}

let timer: NodeJS.Timeout;

/**
 * Component RFCarousel
 * 
 * A carousel looping a set of group of motion text
 * 
 * Motion is `RevealFadeMotion`
 * 
 * @param {RFCarouselProps} props 
 */
const RFCarousel:React.FC<RFCarouselProps> = (props:RFCarouselProps) => {
    const {
        interval = 5000,
        startDelay = 4000,
        defaultGroupIndex = 0,
        textSet = [],
        variant = 'h4',
        ...rest
    } = props;

    const [groupState, setGroupState] = React.useState<{
        index:number, 
        isLeaving:boolean
    }>({index:defaultGroupIndex, isLeaving:false});

    const motionControl = useAnimation();

    React.useEffect(()=>{
        //make sure we stop all animation when this
        //component unmounted
        return ()=>{
            motionControl.stop();
        }
    },[])

    React.useEffect(()=>{

        if(!groupState.isLeaving){
            //set timer for new group
            timer = setTimeout(()=>{
                //leave this group / play exit animate but not
                //moving to next group yet
                setGroupState(state=>{
                    return {
                        ...state,
                        isLeaving:!state.isLeaving
                    }
                })
            }, interval);
            //controled animation need to start manually
            motionControl.start('enter');
        }

        return ()=>{
            if(timer) clearTimeout(timer);
        }
    }, [groupState])

    const handleExistComplete = ()=>{
        //this group has finished exit animation
        //move to next group
        setGroupState(state=>{
            return {
                index:state.index+1,
                isLeaving:false
            }
        })
    }

    const textGroup = textSet[groupState.index % textSet.length];

    return (
        <Box {...rest}>
        <AnimatePresence initial={false} onExitComplete={handleExistComplete}>
        {groupState.isLeaving?null:
            textGroup.map(value=>{
                let option = value.motionOptions;
                if(!option){
                    option = {
                        axis: 'y',
                        indent: 0,
                        opacity: {from: 0, to: 1},
                        enterTranistion: springTransition(300, 55, 0.1),
                        exitTranistion: springTransition(300, 55, 0)
                    }
                }
                let initSize:RFMSize = {width:0, height:0};
                let enterSize:RFMSize = {width:'fit-content', height:'fit-content'};
                let exitSize:RFMSize = {...initSize};

                switch(option.axis){
                    case 'x':
                        initSize = {...initSize, height:'fit-content'}
                        exitSize = {...exitSize, height:'fit-content'}
                        break;
                    case 'y':
                        initSize = {...initSize, width:'fit-content'}
                        exitSize = {...exitSize, width:'fit-content'}
                        break;
                }

                return (
                    <RevealFadeMotion 
                    key={`${shortid.generate()}`}
                    motionControl={motionControl}
                    enterTransition={option.enterTranistion}
                    exitTransition={option.exitTranistion}
                    initOpacity={option.opacity.from}
                    enterOpacity={option.opacity.to}
                    exitOpacity={option.opacity.from}
                    initSize={initSize}
                    enterSize={enterSize}
                    exitSize={exitSize}
                    >
                        <Typography variant={variant} component='div' noWrap={option.axis!=='y'}>
                            <Box pl={option.indent}>
                                {value.text}
                            </Box>
                        </Typography>
                    </RevealFadeMotion>
                )
            })
        }
        </AnimatePresence>
        </Box>
    );
};

export default RFCarousel;