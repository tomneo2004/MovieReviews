import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import React from "react";

export type PageLayoutProps = React.ComponentProps<typeof Box> & {
  // backgroundURL?: string;
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
    // backgroundURL = "",
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <Box
      {...rest}
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
