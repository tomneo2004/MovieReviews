import Box from "@material-ui/core/Box";
import React from "react";
import { IMoviePosterData } from "../../../utils/api/model/apiModelTypes";
import PosterCollection from "../PosterCollection/PosterCollection";

type GalleriesProps = React.ComponentProps<typeof Box> & {
  posters: IMoviePosterData[];
};

const Galleries: React.FC<GalleriesProps> = (props: GalleriesProps) => {
  const { posters, ...rest } = props;
  return (
    <Box {...rest} pt={2}>
      {posters ? (
        <PosterCollection posters={posters} />
      ) : (
        <PosterCollection posters={null} />
      )}
    </Box>
  );
};

export default Galleries;
