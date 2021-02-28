import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import getMovieRating from "../../../utils/movieRating";
import MoviePoster from "../MovieCard/MovieCard";

type SearchResultsProps = React.ComponentProps<typeof Grid> & {
  /**
   * array of data of IMovieData
   */
  data: IMovieData[];

  /**
   * keywords was used for searching
   */
  keywords?: string;

  /**
   * when data is empty, fallback is shown
   */
  fallback?: React.ReactNode;
};

const renderSkeletons = () => {
  const skls = [];
  for (let i = 0; i < 4; i++) {
    skls.push(i);
  }

  return (
    <Grid id="loading-placeholder" container>
      {skls.map((sk) => {
        return (
          <Grid key={sk} item xs>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <Card elevation={0}>
                <Skeleton variant="rect" width={200} height={270} />
                <CardContent>
                  <Skeleton width="60%" />
                  <Skeleton width="20%" />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

/**
 * Component SearchResults
 *
 * A concrete component, display an array of data of IMovieData
 * with Material-UI Grid
 *
 *
 * @param {SearchResultsProps} props
 */
const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => {
  const { data, keywords = "", fallback, id, ...rest } = props;

  if (!data) return renderSkeletons();

  if (!data.length) {
    return (
      <Typography id={id} variant="h4" component="div">
        <Box display="flex" justifyContent="center">
          {fallback
            ? fallback
            : `We could not find any results for ${keywords}`}
        </Box>
      </Typography>
    );
  }

  return (
    <Grid id={id} {...rest} container>
      {data.map((movie) => {
        return (
          <Grid key={movie.id} item xs>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <MoviePoster
                cardWidth={342}
                layoutId={movie.id.toString()}
                linkTo={getRoute(RouteType.movie, { id: movie.id.toString() })}
                src={buildImageQuery(movie.poster_path, "w342")}
                title={movie.title}
                releaseDate={movie.release_date}
                ratingScore={getMovieRating(
                  movie.vote_count,
                  movie.vote_average
                )}
                ratingOffsetX={-8}
                ratingOffsetY={-8}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SearchResults;
