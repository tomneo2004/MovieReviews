import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";
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
                  layoutId={poster.file_path}
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
