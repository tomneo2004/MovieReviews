import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  HScrollChildProp,
  IHorizontalScrollState,
} from "../../unit/HorizontalScroll/HorizontalScroll";
import React from "react";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import getMovieRating from "../../../utils/movieRating";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
import { fade, useTheme } from "@material-ui/core";
import { springTransition } from "../../../framer/Transition";
import FadeMotion from "../../../framer/FadeMotion/FadeMotion";
import MoviePoster from "../MoviePoster/MoviePoster";
import HScroll from "../../unit/HorizontalScroll/HorizontalScroll";
import ScrollIndicator from "./ScrollIndicator";
import { ScreenWidthProps } from "../../../props/screenSizeProps";

type MovieCollectionProps = React.ComponentProps<typeof Box> & ScreenWidthProps & {
  movieData: IMovieData[] | null | undefined;
  onHover?: (data: IMovieData) => void | null | undefined;
  /**
   * scroll left indicator
   */
  scrollLeft?: React.ReactNode;

  /**
   * scroll right indicator
   */
  scrollRight?: React.ReactNode;
};

const renderSkeletons = () => {
  const skeletons: HScrollChildProp[] = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push({
      id: i,
      element: (
        <Paper key={i}>
          <Box width="150px" p={1}>
            <Skeleton animation="wave" variant="rect" height="150px" />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="text" />
          </Box>
        </Paper>
      ),
    });
  }

  return <HScroll id="loading-placeholder">{() => skeletons}</HScroll>;
};

/**
 * Component wrap around horizontal scrol collection
 */
const MovieCollection: React.FC<MovieCollectionProps> = (
  props: MovieCollectionProps
) => {
  const {
    movieData = null,
    onHover = null,
    scrollLeft = null,
    scrollRight = null,
    widthAtSMDown,
    widthAtSMUp,
    widthAtMDUp,
    widthAtLGUp,
    widthAtXLUp,
    ...rest
  } = props;
  const theme = useTheme();
  const [scrollState, setScrollState] = React.useState<IHorizontalScrollState>({
    endLeft: true,
    endRight: true,
  });

  const handleMouseOver = (data: IMovieData) => {
    if (onHover) onHover(data);
  };

  const handleScrollStateChange = (state: IHorizontalScrollState) => {
    // if(state.endLeft !== scrollState.endLeft || state.endRight !== scrollState.endRight){
    //   setScrollState(state);
    // }
    setScrollState(state);
  };

  return (
    <Box {...rest} pt={2}>
      {!movieData ? (
        renderSkeletons()
      ) : (
        <HScroll onScrollStateChange={handleScrollStateChange}>
          {() => {
            return movieData.map((data, i) => {
              return {
                id: data.id,
                element: (
                  <FadeMotion
                    key={`${data.id}`}
                    enterTransition={springTransition(600, 55, i * 0.08)}
                    exitTransition={springTransition(600, 55, i * 0.08)}
                    layout="position"
                  >
                    <MoviePoster
                      linkTo={getRoute(RouteType.movie, {
                        id: data.id.toString(),
                      })}
                      imageURL={buildImageQuery(data.poster_path, "w342")}
                      title={data.title}
                      releaseDate={data.release_date}
                      ratingScore={getMovieRating(
                        data.vote_count,
                        data.vote_average
                      )}
                      onMouseOver={() => handleMouseOver(data)}
                      widthAtSMDown={widthAtSMDown}
                      widthAtSMUp={widthAtSMUp}
                      widthAtMDUp={widthAtMDUp}
                      widthAtLGUp={widthAtLGUp}
                      widthAtXLUp={widthAtXLUp}
                    />
                  </FadeMotion>
                ),
              };
            });
          }}
        </HScroll>
      )}
      {!scrollLeft? null:
          <ScrollIndicator direction="left" enabled={!scrollState.endLeft}>
          <Box
            display="flex"
            flexDirection="column"
            borderRadius={50}
            justifyContent="center"
            alignItems="center"
            width={44}
            height={44}
            bgcolor={fade(theme.palette.primary.light, 0.9)}
          >
            {scrollLeft}
          </Box>
        </ScrollIndicator>
      }
      {!scrollRight? null:
        <ScrollIndicator direction="right" enabled={!scrollState.endRight}>
          <Box
            display="flex"
            flexDirection="column"
            borderRadius={50}
            justifyContent="center"
            alignItems="center"
            width={44}
            height={44}
            bgcolor={fade(theme.palette.primary.light, 0.9)}
          >
            {scrollRight}
          </Box>
        </ScrollIndicator>
      }
    </Box>
  );
};

//render component when data are different
export default React.memo(MovieCollection, (pre, next) => {
  if (!pre.movieData || !next.movieData) return false;
  return pre.movieData === next.movieData;
});
