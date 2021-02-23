import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React from "react";
import PhantomText from "./PhantomText";

export default {
  title: "Phantom Text",
};

export const Default = () => {
  const [show, setShow] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <button onClick={() => setShow((state) => !state)}>toggle</button>
      <AnimateSharedLayout>
        <AnimatePresence>
          {show ? <PhantomText text="This is a text" /> : null}
        </AnimatePresence>
      </AnimateSharedLayout>
    </React.Fragment>
  );
};

export const NoDelay = () => {
  const [show, setShow] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <button onClick={() => setShow((state) => !state)}>toggle</button>
      <AnimateSharedLayout>
        <AnimatePresence>
          {show ? (
            <PhantomText charDefaultDelay={0} text="This is a text" />
          ) : null}
        </AnimatePresence>
      </AnimateSharedLayout>
    </React.Fragment>
  );
};

export const ControlDelay = () => {
  const [show, setShow] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      <button onClick={() => setShow((state) => !state)}>toggle</button>
      <AnimateSharedLayout>
        <AnimatePresence>
          {show ? (
            <PhantomText
              charDefaultDelay={0.1}
              text="This is a text"
              charDelayDefs={{
                1: { enter: 2, exit: 0 },
                2: { enter: 2.5, exit: 0 },
                11: { enter: 3, exit: 0 },
                12: { enter: 3.5, exit: 0 },
              }}
            />
          ) : null}
        </AnimatePresence>
      </AnimateSharedLayout>
    </React.Fragment>
  );
};
