import { Box, Grid } from "@material-ui/core";
import React from "react";
import { IMoviePosterData } from "../../../utils/api/model/apiModelTypes";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../utils/api/query/apiQueryBuilder";
import PosterImage from "../PosterImage/PosterImage";

type GridPosterImageProps = React.ComponentProps<typeof Grid> & {
  posterData: IMoviePosterData[];
  posterSize?: PosterSize;
  onPosterClick?: (i: number) => void;
};

const GridPosterImage: React.FC<GridPosterImageProps> = (
  props: GridPosterImageProps
) => {
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
    <Grid container {...rest}>
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
                imageURL={getPosterImageQuery(poster.file_path, posterSize)}
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
  );
};

export default React.memo(GridPosterImage, (pre, next) => {
  return (
    pre.posterData === next.posterData && pre.posterSize === next.posterSize
  );
});
