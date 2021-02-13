import { Grid, useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { motion } from "framer-motion";
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
            <motion.div layout>{poster}</motion.div>
          </Grid>
        ) : null}
        <Grid md={8} item container justify="center">
          <motion.div layout>{info}</motion.div>
        </Grid>
      </Grid>
      {children}
    </Box>
  );
};

export default MovieLayout;
