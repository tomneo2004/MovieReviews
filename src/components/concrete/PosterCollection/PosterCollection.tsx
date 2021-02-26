import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import dynamic from "next/dynamic";
import React from "react";
import { IMoviePosterData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import HScroll from "../../unit/HorizontalScroll/HorizontalScroll";

const PosterImage = dynamic(() => import("../PosterImage/PosterImage"));

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
            const posterURL = buildImageQuery(poster.file_path, "w500");
            return {
              id: poster.file_path,
              element: (
                <PosterImage
                  imageURL={posterURL}
                  enlargeEnabled
                  layoutId={poster.file_path}
                  hoverCursor="pointer"
                  widthAtSMDown={200}
                  widthAtSMUp={250}
                  widthAtMDUp={250}
                  widthAtLGUp={300}
                  widthAtXLUp={300}
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
