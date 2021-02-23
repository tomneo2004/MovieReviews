import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import ScaleMotion from "./ScaleMotion";

export default {
  title: "Scale Motion",
};

export const Default = () => {
  const [show, setShow] = React.useState<boolean>(true);
  return (
    <React.Fragment>
      <button onClick={() => setShow((state) => !state)}>toggle</button>
      <AnimateSharedLayout>
        <AnimatePresence>
          {show ? (
            <Typography variant="h4" component="div">
              <Box fontSize="8rem">
                <ScaleMotion key="scale">This is text</ScaleMotion>
              </Box>
            </Typography>
          ) : null}
        </AnimatePresence>
      </AnimateSharedLayout>
    </React.Fragment>
  );
};
