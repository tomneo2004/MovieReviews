import { Grid } from "@material-ui/core";
import React from "react";
import { IMovieDetailData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import PosterImage from "../PosterImage/PosterImage"
import MovieInfo from "../MovieInfo/MovieInfo"

type OverviewProps = React.ComponentProps<typeof Grid> & {
  movieDetail: IMovieDetailData;
};

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const { movieDetail, ...rest } = props;

  return (
    <Grid {...rest} container>
      <Grid md={4} item container justify="center">
        <PosterImage
          layoutId={movieDetail.id.toString()}
          imageURL={buildImageQuery(movieDetail.poster_path, "w342")}
          enlargeEnabled
          hoverCursor="pointer"
          widthAtSMDown={250}
          widthAtSMUp={250}
          widthAtMDUp={300}
          widthAtLGUp={400}
          widthAtXLUp={400}
        />
      </Grid>
      <Grid md={8} item container justify="center">
        <MovieInfo movieDetail={movieDetail} />
      </Grid>
    </Grid>
  );
};

export default Overview;
