import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import { springTransition } from "../../../framer/Transition";
import RFCarousel, { RFCMotionOptions } from "./RFCarousel";

export default {
  title: "RFCarousel",
};

export const Default = () => {
  return (
    <React.Fragment>
      <AnimateSharedLayout>
        <RFCarousel
          textSet={[
            [
              { text: "First text" },
              { text: "Second text" },
              { text: "Third text" },
            ],
            [{ text: "One" }, { text: "Two" }, { text: "Three" }],
            [
              { text: "Today" },
              { text: "is a beautiful day" },
              { text: "like to go out" },
            ],
          ]}
        />
      </AnimateSharedLayout>
    </React.Fragment>
  );
};

export const Sequence = () => {
  const option1: RFCMotionOptions = {
    axis: "y",
    opacity: { from: 0, to: 1 },
    enterTranistion: springTransition(300, 55, 0.1),
    exitTranistion: springTransition(300, 55, 1),
  };

  const option2: RFCMotionOptions = {
    ...option1,
    enterTranistion: springTransition(300, 55, 0.5),
    exitTranistion: springTransition(300, 55, 0.5),
  };

  const option3: RFCMotionOptions = {
    ...option1,
    enterTranistion: springTransition(300, 55, 1),
    exitTranistion: springTransition(300, 55, 0.1),
  };

  return (
    <React.Fragment>
      <AnimateSharedLayout>
        <RFCarousel
          textSet={[
            [
              { text: "First text", motionOptions: option1 },
              { text: "Second text", motionOptions: option2 },
              { text: "Third text", motionOptions: option3 },
            ],
            [
              { text: "One", motionOptions: option1 },
              { text: "Two", motionOptions: option2 },
              { text: "Three", motionOptions: option3 },
            ],
            [
              { text: "Today", motionOptions: option1 },
              { text: "is a beautiful day", motionOptions: option2 },
              { text: "like to go out", motionOptions: option3 },
            ],
          ]}
        />
      </AnimateSharedLayout>
    </React.Fragment>
  );
};

export const Sequence2 = () => {
  const option1: RFCMotionOptions = {
    axis: "y",
    opacity: { from: 0, to: 1 },
    enterTranistion: springTransition(300, 55, 0.1),
    exitTranistion: springTransition(300, 55, 1),
  };

  const option2: RFCMotionOptions = {
    ...option1,
    axis: "both",
    enterTranistion: springTransition(300, 55, 1),
    exitTranistion: springTransition(300, 55, 0.1),
  };

  const option3: RFCMotionOptions = {
    ...option1,
    enterTranistion: springTransition(300, 55, 0.5),
    exitTranistion: springTransition(300, 55, 0.5),
  };

  return (
    <React.Fragment>
      <AnimateSharedLayout>
        <RFCarousel
          textSet={[
            [
              { text: "First text", motionOptions: option1 },
              { text: "Second text", motionOptions: option2 },
              { text: "Third text", motionOptions: option3 },
            ],
            [
              { text: "One", motionOptions: option1 },
              { text: "Two", motionOptions: option2 },
              { text: "Three", motionOptions: option3 },
            ],
            [
              { text: "Today", motionOptions: option1 },
              { text: "is a beautiful day", motionOptions: option2 },
              { text: "like to go out", motionOptions: option3 },
            ],
          ]}
        />
      </AnimateSharedLayout>
    </React.Fragment>
  );
};

export const Indentation = () => {
  const option1: RFCMotionOptions = {
    axis: "y",
    indent: 0,
    opacity: { from: 0, to: 1 },
    enterTranistion: springTransition(300, 55, 0.1),
    exitTranistion: springTransition(300, 55, 1),
  };

  const option2: RFCMotionOptions = {
    ...option1,
    axis: "both",
    indent: 1,
    enterTranistion: springTransition(300, 55, 1),
    exitTranistion: springTransition(300, 55, 0.1),
  };

  const option3: RFCMotionOptions = {
    ...option1,
    indent: 2,
    enterTranistion: springTransition(300, 55, 0.5),
    exitTranistion: springTransition(300, 55, 0.5),
  };

  return (
    <React.Fragment>
      <AnimateSharedLayout>
        <RFCarousel
          textSet={[
            [
              { text: "First text", motionOptions: option1 },
              { text: "Second text", motionOptions: option2 },
              { text: "Third text", motionOptions: option3 },
            ],
            [
              { text: "One", motionOptions: option1 },
              { text: "Two", motionOptions: option2 },
              { text: "Three", motionOptions: option3 },
            ],
            [
              { text: "Today", motionOptions: option1 },
              { text: "is a beautiful day", motionOptions: option2 },
              { text: "like to go out", motionOptions: option3 },
            ],
          ]}
        />
      </AnimateSharedLayout>
    </React.Fragment>
  );
};
