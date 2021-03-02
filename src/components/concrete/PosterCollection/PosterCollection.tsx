import Box from "@material-ui/core/Box/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography/Typography";
import { motion } from "framer-motion";
import React from "react";
import { springTransition } from "../../../framer/Transition";
import { IMoviePosterData } from "../../../utils/api/model/apiModelTypes";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../utils/api/query/apiQueryBuilder";
import HScroll from "../../unit/HorizontalScroll/HorizontalScroll";
import PosterImage from "../PosterImage/PosterImage";

type PosterCollectionProps = React.ComponentProps<typeof Box> & {
  posters: IMoviePosterData[];
};

const PosterCollection: React.FC<PosterCollectionProps> = (
  props: PosterCollectionProps
) => {
  const { posters, ...rest } = props;
  const theme = useTheme();

  if (!posters) return null;

  if (!posters.length) {
    return (
      <Typography variant="h4" component="div">
        <Box
          display="flex"
          justifyContent="center"
        >{`We could not find any videos`}</Box>
      </Typography>
    );
  }
  return (
    <Box {...rest}>
      <HScroll>
        {() => {
          return posters.map((poster) => {
            const posterURL = getPosterImageQuery(
              poster.file_path,
              PosterSize.w500
            );
            return {
              id: poster.file_path,
              element: (
                <PosterImage
                  src={posterURL}
                  enlargeEnabled
                  hoverCursor="pointer"
                  widthAtSMDown={200}
                  widthAtSMUp={250}
                  widthAtMDUp={250}
                  widthAtLGUp={300}
                  widthAtXLUp={300}
                  preProcessEnlarge={(node) => (
                    <motion.div
                      layoutId={poster.file_path}
                      transition={springTransition(660, 33, 0.1)}
                    >
                      {node}
                    </motion.div>
                  )}
                  preProcess={(node) => (
                    <motion.div
                      layoutId={poster.file_path}
                      initial={{ zIndex: theme.zIndex.modal + 1 }}
                      animate={{ zIndex: 0 }}
                      transition={springTransition(660, 33, 0.1)}
                    >
                      {node}
                    </motion.div>
                  )}
                />
              ),
            };
          });
        }}
      </HScroll>
    </Box>
  );
};

export default PosterCollection;
