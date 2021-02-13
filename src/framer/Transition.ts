import { Transition } from "framer-motion";

export const springTransition = (
  stiffness: number = 300,
  damping = 25
): Transition => {
  return {
    type: "spring",
    stiffness: stiffness,
    damping: damping,
  };
};
