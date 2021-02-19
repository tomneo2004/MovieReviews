import { Transition } from "framer-motion";

type OrchestrationOptions = {
  delayChildren: number,
  staggerChildren: number,
  staggerDirection: number,
  when: false | "beforeChildren" | "afterChildren" | string
}

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
    when
  }
}
/**
 * Get a spring transition
 * @param stiffness default 300
 * @param damping default 25
 * @param delay default 0
 */
export const springTransition = (
  stiffness: number = 300,
  damping: number = 25,
  delay: number = 0,
  orchestrateOptions: OrchestrationOptions = orchestrate()
): Transition => {
  return {
    type: "spring",
    stiffness: stiffness,
    damping: damping,
    delay: delay,
    ...orchestrateOptions
  };
};

export default {};
