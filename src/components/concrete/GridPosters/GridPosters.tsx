import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import { IMoviePosterData } from "../../../utils/api/model/apiModelTypes";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../utils/api/query/apiQueryBuilder";
import PosterImage from "../PosterImage/PosterImage";

type GridPostersProps = React.ComponentProps<typeof Box> & {
  posterData: IMoviePosterData[];
  posterSize?: PosterSize;
  onPosterClick?: (i: number) => void;
};

/**
 * Component GridPosters
 *
 * Present all posters in as grid layout
 *
 * @param props
 */
const GridPosters: React.FC<GridPostersProps> = (props: GridPostersProps) => {
  const {
    posterData,
    posterSize = PosterSize.original,
    onPosterClick,
    ...rest
  } = props;

  const handlePosterClick = (i: number) => {
    if (onPosterClick) onPosterClick(i);
  };

  return (
    <Box {...rest}>
      <Grid container>
        {posterData.map((poster, i) => {
          return (
            <Grid key={poster.file_path} item xs>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
              >
                <PosterImage
                  src={getPosterImageQuery(poster.file_path, posterSize)}
                  elevation={4}
                  aspectRatio={1.4}
                  onClick={() => handlePosterClick(i)}
                  hoverCursor="pointer"
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default React.memo(GridPosters, (pre, next) => {
  return (
    pre.posterData === next.posterData && pre.posterSize === next.posterSize
  );
});
