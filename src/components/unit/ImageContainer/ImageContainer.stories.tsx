import React from "react";
import ImageContainer from "./ImageContainer";
import { Modal } from "@material-ui/core";

export default {
  title: "Aspect Ratio Image",
};

export const Default = () => {
  return (
    <ImageContainer src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" />
  );
};

export const FixedSize = () => {
  return (
    <ImageContainer
      width={300}
      height={600}
      src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />
  );
};

export const WithModal = () => {
  return (
    <Modal open={true}>
      <ImageContainer
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />
    </Modal>
  );
};
