import { Transition } from "framer-motion";
import { Easing } from "framer-motion/types/types";

type OrchestrationOptions = {
  delayChildren: number;
  staggerChildren: number;
  staggerDirection: number;
  when: false | "beforeChildren" | "afterChildren" | string;
};

export const orchestrate = (
  delayChildren: number = 0,
  staggerChildren: number = 0,
  staggerDirection: number = 1,
  when: false | "beforeChildren" | "afterChildren" | string = false
): OrchestrationOptions => {
  return {
    delayChildren,
    staggerChildren,
    staggerDirection,
    when,
  };
};
/**
 * Get a spring transition
 * @param stiffness Stiffness of the spring. Higher values will create more sudden movement default 300
 * @param damping Strength of opposing force. If set to 0, spring will oscillate indefinitely default 25
 * @param delay default 0
 * @param mass Mass of the moving object. Higher values will result in more lethargic movement. Set to 1 by default.
 * @param bounce default 0
 * @param duration If bounce is set, this defaults to 0.8.

Note: duration and bounce will be overridden if stiffness, damping or mass are set.
 */
export const springTransition = (
  stiffness: number = 300,
  damping: number = 25,
  delay: number = 0,
  mass: number = 1,
  bounce: number = 0,
  duration: number = 1,
  orchestrateOptions: OrchestrationOptions = orchestrate()
): Transition => {
  return {
    type: "spring",
    stiffness,
    damping,
    delay,
    mass,
    bounce,
    duration,
    ...orchestrateOptions,
  };
};

export const tweenTransition = (
  duration: number = 0.3,
  ease: Easing | Easing[] = "linear",
  from: number | string = 0,
  times: number[] = [],
  orchestrateOptions: OrchestrationOptions = orchestrate()
): Transition => {
  return {
    type: "tween",
    duration,
    ease,
    from,
    times,
    ...orchestrateOptions,
  };
};

export default {};
