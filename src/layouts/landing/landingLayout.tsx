import Box from "@material-ui/core/Box/Box";
import React from "react";

export interface IProps {
  children: React.ReactElement[];
}

const LaningLayout = (props: IProps) => {
  const { children } = props;

  return (
    <Box display="flex" flexDirection="column" justifyContent="flex-start">
      {children}
    </Box>
  );
};

export default LaningLayout;
