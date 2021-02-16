import { Transition } from "framer-motion";

/**
 * Get a spring transition
 * @param stiffness default 300
 * @param damping default 25
 * @param delay default 0
 */
export const springTransition = (
  stiffness: number = 300,
  damping: number = 25,
  delay: number = 0
): Transition => {
  return {
    type: "spring",
    stiffness: stiffness,
    damping: damping,
    delay: delay,
  };
};
