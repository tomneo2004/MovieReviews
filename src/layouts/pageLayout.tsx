import { Box, makeStyles, useTheme } from "@material-ui/core";
import React from "react";

export type PageLayoutProps = React.ComponentProps<typeof Box> & {
  backgroundURL?: string;
  banner?: React.ReactNode;
  children: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
};
const PageLayout: React.FC<PageLayoutProps> = (props: PageLayoutProps) => {
  const {
    children,
    navigation = null,
    footer = null,
    banner = null,
    backgroundURL = "",
    ...rest
  } = props;

  const theme = useTheme();

  const classes = makeStyles({
    fixedBg: {
      backgroundColor: theme.palette.primary.light,
      background: `url(${backgroundURL})`,
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundPosition: "center 20%",
      backgroundOrigin: "border-box",
    },
  })();

  return (
    <Box
      {...rest}
      className={backgroundURL ? classes.fixedBg : ""}
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
