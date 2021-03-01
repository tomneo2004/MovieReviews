import { useTheme } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
// import { getRoute, RouteType } from "../../../routes/routesGenerator";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../utils/api/query/apiQueryBuilder";
import getMovieRating from "../../../utils/movieRating";
// import getMovieRating from "../../../utils/movieRating";
import { formatDateTime } from "../../../utils/timeConverter";
import VerticalList from "../../unit/VerticalList/VerticalList";
// import MoviePoster from "../MovieCard/MovieCard";
import SearchCard from "../SearchCard/SearchCard";

type SearchResultsProps = React.ComponentProps<typeof Box> & {
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
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress />
    </Box>
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
  const theme = useTheme();

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
    <VerticalList itemCount={data.length} {...rest}>
      {({ index, measure }) => {
        const movieData = data[index];

        return (
          <SearchCard
            borderBottom={`2px solid ${theme.palette.primary.main}`}
            p={2}
            linkTo={getRoute(RouteType.movie, { id: movieData.id.toString() })}
            src={getPosterImageQuery(movieData.poster_path, PosterSize.w185)}
            imageWidth={185}
            imageRatio={1.4}
            title={movieData.title}
            releaseDate={formatDateTime(movieData.release_date)}
            ratingScore={getMovieRating(
              movieData.vote_count,
              movieData.vote_average
            )}
            onImageLoaded={measure}
            onResize={measure}
          />
        );
      }}
    </VerticalList>
  );

  // return (
  //   <Grid id={id} {...rest} container>
  //     {data.map((movie) => {
  //       return (
  //         <Grid key={movie.id} item xs>
  //           <Box
  //             display="flex"
  //             justifyContent="center"
  //             alignItems="center"
  //             p={2}
  //           >
  //             <MoviePoster
  //               cardWidth={342}
  //               linkTo={getRoute(RouteType.movie, { id: movie.id.toString() })}
  //               src={getPosterImageQuery(movie.poster_path, PosterSize.w342)}
  //               title={movie.title}
  //               releaseDate={movie.release_date}
  //               ratingScore={getMovieRating(
  //                 movie.vote_count,
  //                 movie.vote_average
  //               )}
  //               ratingOffsetX={-8}
  //               ratingOffsetY={-8}
  //             />
  //           </Box>
  //         </Grid>
  //       );
  //     })}
  //   </Grid>
  // );
};

export default SearchResults;
