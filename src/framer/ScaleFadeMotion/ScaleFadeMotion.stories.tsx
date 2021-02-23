import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import ScaleFade from "./ScaleFadeMotion";

export default {
  title: "Scale Fade Motion",
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
                <ScaleFade key="scale">This is text</ScaleFade>
              </Box>
            </Typography>
          ) : null}
        </AnimatePresence>
      </AnimateSharedLayout>
    </React.Fragment>
  );
};
