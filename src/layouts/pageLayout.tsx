import { Box, makeStyles, useTheme } from "@material-ui/core";
import React from "react";

export interface IProps {
  backgroundURL?: string;
  banner?: React.ReactNode;
  children: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
}
const PageLayout = (props: IProps) => {
  const { children, navigation = null, footer = null, banner = null, backgroundURL='' } = props;

  const theme = useTheme();

  const classes = makeStyles({
    fixedBg:{
      backgroundColor: theme.palette.primary.light,
      background: `url(${backgroundURL}) no-repeat fixed center 20%`
    }
  })();

  return (
    <Box
      className={backgroundURL? classes.fixedBg:''}
      position="relative"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      bgcolor={theme.palette.primary.light}
      height="inherit"
    >
      {banner}
      {navigation ? navigation : null}
      {children}
      {footer ? footer : null}
    </Box>
  );
};

export default PageLayout;
