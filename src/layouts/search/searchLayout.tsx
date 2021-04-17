import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import React from "react";

export interface IProps {
  children: React.ReactNode;
}

const SearchLayout = (props: IProps) => {
  const { children } = props;

  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      py={2}
      bgcolor={theme.palette.primary.light}
    >
      {children}
    </Box>
  );
};

export default SearchLayout;
