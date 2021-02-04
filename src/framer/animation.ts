/**
 * spring transition
 * 
 * type: spring
 * 
 * stiffness: 500
 * 
 * damping: 25
 */
export const springTransition = {
    type: "spring",
    stiffness: 500,
    damping: 25
}

/**
 * Default orchestration
 * 
 * staggerChildren 0.08
 */
export const orchestration = {
    init:{},
    enter:{
        transition:{when:'beforeChildren', staggerChildren:0.08}
    },
    exit:{
        transition:{when:'afterChildren', staggerChildren:0.08}
    }
}

/**
 * scale from 0.5 -> 1
 * 
 * opacity from 0 -> 1
 * 
 * reverse on exit
 */
export const scaleFadeMotion = {
    init:{opacity:0, scale:0.5},
    enter:{
        opacity:1,
        scale:1,
    },
    exit:{
        opacity:0,
        scale:0.5,
    }
}

/**
 * with spring motion
 * 
 * scale from 0.5 -> 1
 * 
 * opacity from 0 -> 1
 * 
 * reverse on exit
 */
export const scaleFadeSpringMotion = {
    init:{opacity:0, scale:0.5},
    enter:{
        opacity:1,
        scale:1,
        transition:springTransition,
    },
    exit:{
        opacity:0,
        scale:0.5,
        transition:springTransition,
    }
}