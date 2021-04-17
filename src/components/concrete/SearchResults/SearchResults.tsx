import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box/Box";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import {
  getPosterImageQuery,
  PosterSize,
} from "../../../utils/api/query/apiQueryBuilder";
import getMovieRating from "../../../utils/movieRating";
import { formatDateTime } from "../../../utils/timeConverter";
// import VerticalList from "../../unit/VerticalList/VerticalList";
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

  // return (
  //   <VerticalList itemCount={data.length} {...rest}>
  //     {({ index, measure }) => {
  //       const movieData = data[index];

  //       return (
  //         <SearchCard
  //           borderBottom={`2px solid ${theme.palette.primary.main}`}
  //           p={2}
  //           linkTo={getRoute(RouteType.movie, { id: movieData.id.toString() })}
  //           src={getPosterImageQuery(movieData.poster_path, PosterSize.w185)}
  //           imageWidth={185}
  //           imageRatio={1.4}
  //           title={movieData.title}
  //           releaseDate={formatDateTime(movieData.release_date)}
  //           ratingScore={getMovieRating(
  //             movieData.vote_count,
  //             movieData.vote_average
  //           )}
  //           onImageLoaded={measure}
  //           onResize={measure}
  //         />
  //       );
  //     }}
  //   </VerticalList>
  // );

  return (
    <Box {...rest}>
      <Box display='flex' flexDirection='column'>
        {data.map(movie=>(
          <SearchCard
          key={movie.id}
          borderBottom={`2px solid ${theme.palette.primary.main}`}
          p={2}
          linkTo={getRoute(RouteType.movie, { id: movie.id.toString() })}
          src={getPosterImageQuery(movie.poster_path, PosterSize.w185)}
          imageWidth={185}
          imageRatio={1.4}
          title={movie.title}
          releaseDate={formatDateTime(movie.release_date)}
          ratingScore={getMovieRating(
            movie.vote_count,
            movie.vote_average
          )}
          />
        ))}
      </Box>
    </Box>
  )
};

export default SearchResults;
