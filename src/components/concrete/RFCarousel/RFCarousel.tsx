import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { AnimatePresence, Transition } from 'framer-motion';
import React from 'react';
import shortid from 'shortid';
import RevealFadeMotion, { RFMSize } from '../../../framer/RevealFadeMotion/RevealFadeMotion';
import { springTransition } from '../../../framer/Transition';

export type RFCMotionOptions = {
    /** direction of motion */
    axis: 'x'|'y'|'both',
    /** motion opacity */
    opacity: {from:number, to:number},
    /** Transition for enter */
    enterTranistion: Transition,
    /** Transition for exit */
    exitTranistion: Transition
}
type RFCText = {
    text:string;
    motionOptions?:RFCMotionOptions
}

type RFCTextGroup = RFCText[];

type RFCarouselProps = React.ComponentProps<typeof React.Component> & {
    /**
     * How long is a group be presented
     * before preseting next group
     */
    interval?: number;

    /**
     * An transition time between last group to next group
     * 
     * This transition will be added to interval except at beginning
     * 
     * Should account for animation out and in time
     * 
     * [Group A animate out] + [Group B animate in] = transition
     */
    transition?: number;

    /**
     * Index of group will be presented at beginning
     */
    defaultGroupIndex?: number;

    /**
     * A set of group of text and each text can be defined
     * with a motion 
     */
    textSet: RFCTextGroup[];
}

let timer: NodeJS.Timeout;

/**
 * Component RFCarousel
 * 
 * A carousel looping a set of group of motion text
 * 
 * @param {RFCarouselProps} props 
 */
const RFCarousel:React.FC<RFCarouselProps> = (props:RFCarouselProps) => {
    const {
        interval = 5000,
        defaultGroupIndex = 0,
        textSet = [],
    } = props;

    const [index, setIndex] = React.useState<number>(defaultGroupIndex);

    React.useEffect(()=>{
        timer = setTimeout(()=>{
            setIndex(index=>index+1);
        }, interval + (index?3000:0));

        return ()=>{
            if(timer) clearTimeout(timer);
        }
    }, [index])

    const textGroup = textSet[index % textSet.length];

    return (
        <AnimatePresence exitBeforeEnter>
        {
            textGroup.map(value=>{
                let option = value.motionOptions;
                if(!option){
                    option = {
                        axis: 'y',
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
                    enterTransition={option.enterTranistion}
                    exitTransition={option.exitTranistion}
                    initOpacity={option.opacity.from}
                    enterOpacity={option.opacity.to}
                    exitOpacity={option.opacity.from}
                    initSize={initSize}
                    enterSize={enterSize}
                    exitSize={exitSize}
                    >
                        <Typography key={`${shortid.generate()}`} variant='h4' component='div' noWrap={option.axis!=='y'}>
                            <Box fontSize='3rem'>
                                {value.text}
                            </Box>
                        </Typography>
                    </RevealFadeMotion>
                )
            })
        }
        </AnimatePresence>
    );
};

export default RFCarousel;