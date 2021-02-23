import { AnimatePresence } from "framer-motion";
import React from "react";
import shortid from "shortid";
import ScaleMotion from "../../../framer/ScaleMotion/ScaleMotion";
import { springTransition } from "../../../framer/Transition";

type ScrollIndicatorProps = React.ComponentProps<typeof ScaleMotion> & {
  direction: "left" | "right";
  enabled: boolean;
};

const ScrollIndicator: React.FC<ScrollIndicatorProps> = (
  props: ScrollIndicatorProps
) => {
  const { children, direction, enabled, ...rest } = props;

  return (
    <AnimatePresence>
      {!enabled ? null : (
        <ScaleMotion
          key={shortid.generate()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: direction === "left" ? 0 : "auto",
            right: direction === "right" ? 0 : "auto",
          }}
          enterTransition={springTransition(600, 15, 0.1)}
          exitTransition={springTransition(300, 55, 0.1)}
          {...rest}
        >
          {children}
        </ScaleMotion>
      )}
    </AnimatePresence>
  );
};

export default React.memo(
  ScrollIndicator,
  (pre, next) => pre.enabled === next.enabled
);
