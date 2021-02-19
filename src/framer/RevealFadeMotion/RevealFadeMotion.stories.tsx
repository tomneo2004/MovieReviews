import { Box, Typography } from "@material-ui/core";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import { springTransition } from "../Transition";
import RevealFadeMotion from './RevealFadeMotion';

export default {
  title: "RevealFadeMotion",
};

export const Default = ()=>{
    const [show, setShow] = React.useState<boolean>(true);
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    <RevealFadeMotion key='rf'>
                        <Typography variant='h4' component='div'>
                            <Box fontSize='8rem'>
                                Text
                            </Box>
                        </Typography>
                    </RevealFadeMotion>
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const Width = ()=>{
    const [show, setShow] = React.useState<boolean>(true);
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    <RevealFadeMotion
                    key='rf'
                    initSize={{width:0, height:'fit-content'}}
                    enterSize={{width:'fit-content', height:'fit-content'}}
                    exitSize={{width:0, height:'fit-content'}}
                    >
                        <Typography variant='h4' component='div'>
                            <Box fontSize='8rem'>
                                Text
                            </Box>
                        </Typography>
                    </RevealFadeMotion>
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const WidthHeight = ()=>{
    const [show, setShow] = React.useState<boolean>(true);
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    <RevealFadeMotion
                    key='rf'
                    initSize={{width:0, height:0}}
                    enterSize={{width:'fit-content', height:'fit-content'}}
                    exitSize={{width:0, height:0}}
                    >
                        <Typography variant='h4' component='div'>
                            <Box fontSize='8rem'>
                                Text
                            </Box>
                        </Typography>
                    </RevealFadeMotion>
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const Multiple = ()=>{
    const [show, setShow] = React.useState<boolean>(true);

    console.log(springTransition(null, null, 1));

    const motionTexts = [
        <RevealFadeMotion key='1' 
        enterTransition={springTransition(300, 55, 0)}
        exitTransition={springTransition(300, 55, 1)}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    This trip
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='2' 
        enterTransition={springTransition(300, 55, 1)}
        exitTransition={springTransition(300, 55, 0)}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    few days ago
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='3' 
        enterTransition={springTransition(300, 55, 0.4)}
        exitTransition={springTransition(300, 55, 0.4)}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    is so awesome
                </Box>
            </Typography>
        </RevealFadeMotion>
    ]
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    motionTexts.map(value=>{
                        return value;
                    })    
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const Random = ()=>{
    const [show, setShow] = React.useState<boolean>(true);

    console.log(springTransition(null, null, 1));

    const motionTexts = [
        <RevealFadeMotion key='1' 
        enterTransition={springTransition(300, 55, Math.random())}
        exitTransition={springTransition(300, 55, Math.random())}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    This trip
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='2' 
        enterTransition={springTransition(300, 55, Math.random())}
        exitTransition={springTransition(300, 55, Math.random())}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    few days ago
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='3' 
        enterTransition={springTransition(300, 55, Math.random())}
        exitTransition={springTransition(300, 55, Math.random())}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    is so awesome
                </Box>
            </Typography>
        </RevealFadeMotion>
    ]
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    motionTexts.map(value=>{
                        return value;
                    })    
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const DiffMotion = ()=>{
    const [show, setShow] = React.useState<boolean>(true);

    console.log(springTransition(null, null, 1));

    const motionTexts = [
        <RevealFadeMotion key='1' 
        enterTransition={springTransition(300, 55, 0)}
        exitTransition={springTransition(300, 55, 1)}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    This trip
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='2' 
        initSize={{width:0, height:'fit-content'}}
        enterSize={{width:'fit-content', height:'fit-content'}}
        exitSize={{width:0, height:'fit-content'}}
        enterTransition={springTransition(300, 55, 1)}
        exitTransition={springTransition(300, 55, 0)}
        >
            <Typography variant='h4' component='div' noWrap>
                <Box fontSize='3rem'>
                    few days ago
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='3' 
        enterTransition={springTransition(300, 55, 0.4)}
        exitTransition={springTransition(300, 55, 0.4)}
        >
            <Typography variant='h4' component='div'>
                <Box fontSize='3rem'>
                    is so awesome
                </Box>
            </Typography>
        </RevealFadeMotion>
    ]
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    motionTexts.map(value=>{
                        return value;
                    })    
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}

export const Characters = ()=>{
    const [show, setShow] = React.useState<boolean>(true);

    console.log(springTransition(null, null, 1));

    const motionTexts = [
        <RevealFadeMotion key='1'
        inlineBlock 
        initSize={{width:0, height:'fit-content'}}
        enterSize={{width:'fit-content', height:'fit-content'}}
        exitSize={{width:0, height:'fit-content'}}
        enterTransition={springTransition(300, 55, 0)}
        exitTransition={springTransition(300, 55, 1)}
        >
            <Typography variant='h4' component='div' noWrap>
                <Box fontSize='3rem'>
                    This trip
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='2'
        inlineBlock 
        initSize={{width:0, height:'fit-content'}}
        enterSize={{width:'fit-content', height:'fit-content'}}
        exitSize={{width:0, height:'fit-content'}}
        enterTransition={springTransition(300, 55, 1)}
        exitTransition={springTransition(300, 55, 0)}
        >
            <Typography variant='h4' component='div' noWrap>
                <Box fontSize='3rem'>
                    few days ago
                </Box>
            </Typography>
        </RevealFadeMotion>,
        <RevealFadeMotion key='3' 
        inlineBlock
        initSize={{width:0, height:'fit-content'}}
        enterSize={{width:'fit-content', height:'fit-content'}}
        exitSize={{width:0, height:'fit-content'}}
        enterTransition={springTransition(300, 55, 0.4)}
        exitTransition={springTransition(300, 55, 0.4)}
        >
            <Typography variant='h4' component='div' noWrap>
                <Box fontSize='3rem'>
                    is so awesome
                </Box>
            </Typography>
        </RevealFadeMotion>
    ]
    return (
        <React.Fragment>
        <button onClick={()=>setShow(state=>!state)}>toggle</button>
        <AnimateSharedLayout>
            <AnimatePresence>
                {show?
                    motionTexts.map(value=>{
                        return value;
                    })    
                    :null
                }
            </AnimatePresence>
        </AnimateSharedLayout>
        </React.Fragment>
    )
}