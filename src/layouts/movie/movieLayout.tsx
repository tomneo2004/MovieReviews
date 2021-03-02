import useTheme from "@material-ui/core/styles/useTheme";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import React from "react";

export interface IProps {
  poster: React.ReactElement;
  info: React.ReactElement;
  children?: React.ReactElement;
}

const MovieLayout = (props: IProps) => {
  const { poster, info, children = null } = props;
  const theme = useTheme();
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      p={2}
      bgcolor={theme.palette.primary.light}
    >
      {/* information */}
      <Grid container>
        {poster ? (
          <Grid md={4} item container justify="center">
            {poster}
          </Grid>
        ) : null}
        <Grid md={8} item container justify="center">
          {info}
        </Grid>
      </Grid>
      {children}
    </Box>
  );
};

export default MovieLayout;
