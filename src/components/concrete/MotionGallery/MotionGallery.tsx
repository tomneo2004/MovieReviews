import {Button, makeStyles, Modal, useTheme } from '@material-ui/core';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from 'popmotion';
import React from 'react';
import LeftArrowIcon from '@material-ui/icons/ArrowLeftSharp';
import RigthArrowIcon from '@material-ui/icons/ArrowRightSharp';
import style from './MotionGalleryStyle';

type MotionGalleryProps = React.ComponentProps<typeof React.Component> & {
    open:boolean;
    onClose?:()=>void;
    images: string[];
    defaultIndex?: number;
    previousIcon?: React.ReactNode;
    nextIcon?: React.ReactNode;
    stiffness?:number;
    damping?:number;
}

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MotionGallery:React.FC<MotionGalleryProps> = (props:MotionGalleryProps) => {
    const {
        open,
        onClose,
        images,
        defaultIndex = 0,
        previousIcon = (
            <LeftArrowIcon />
        ),
        nextIcon = (
            <RigthArrowIcon />
        ),
        stiffness = 600,
        damping = 33
    } = props;
    const theme = useTheme();
    const classes = makeStyles(style)({theme});
    const [[page, direction], setPage] = React.useState([defaultIndex, 0]);
    const variants = React.useMemo(()=>{
        return {
            init: (direction: number) => {
                return {
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                };
            },
            enter: {
                zIndex: 1,
                x: 0,
                opacity: 1,
                transition: {
                    x: { type: "spring", stiffness, damping},
                    opacity: { duration: 0.2 }
                  }
            },
            exit: (direction: number) => {
                return {
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0,
                    transition: {
                        x: { type: "spring", stiffness, damping},
                        opacity: { duration: 0.2 }
                    }
                };
            }
        };
    }, []);
    
    React.useEffect(()=>{
        setPage(state=>[defaultIndex, state[1]])
    },[defaultIndex])

    if(!images) return null;

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);


    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <Modal open={open} style={{display:'flex', justifyContent:'center'}}
        BackdropProps={{style:{backgroundColor:'rgba(22, 22, 22, 0.9)'}}}
        >
        <React.Fragment>
        <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="init"
          animate="enter"
          exit="exit"
          style={{position:'absolute', height:'100%'}}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <motion.div style={{position:'absolute', left:'1%', top:'50%', zIndex:2}}>
            <Button classes={{root:classes.button}} variant='contained' onClick={() => paginate(1)}>
                {previousIcon}
            </Button>
        </motion.div >
        <motion.div style={{position:'absolute', right:'1%', top:'50%', zIndex:2}}>
        <Button classes={{root:classes.button}} variant='contained' onClick={() => paginate(-1)}>
            {nextIcon}
        </Button>
      </motion.div >
      <motion.div style={{position:'absolute', right:'1%', top:'1%', zIndex:2}}>
        <Button classes={{root:classes.button}} variant='contained' onClick={onClose}>
            Close
        </Button>
      </motion.div>
      </React.Fragment>    
        </Modal>
    );
};

export default MotionGallery;