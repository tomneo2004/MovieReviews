import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import MoviePoster from "../MoviePoster/MoviePoster";
import HScroll, {
  HScrollChildProp, IHorizontalScrollState,
} from "../../unit/HorizontalScroll/HorizontalScroll";
import React from "react";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import getMovieRating from "../../../utils/movieRating";
// import Link from "next/link";
import { getRoute, RouteType } from "../../../routes/routesGenerator";
import ScaleFadeFlow from "../../../framer/ScaleFadeMotion";
import { fade, useTheme } from "@material-ui/core";

type MovieCollectionProps = React.ComponentProps<typeof Box> & {
  movieData: IMovieData[] | null | undefined;
  onHover?: (data: IMovieData) => void | null | undefined;
  scrollLeft?: React.ReactNode;
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
  const {movieData = null, onHover = null, scrollLeft = null, scrollRight = null, ...rest } = props;
  const theme = useTheme();
  const [scrollState, setScrollState] = React.useState<IHorizontalScrollState>({
    endLeft: false,
    endRight: false
  });

  const handleMouseOver = (data: IMovieData) => {
    if (onHover) onHover(data);
  };

  const handleScrollStateChange = (state:IHorizontalScrollState)=>{
    if(state.endLeft !== scrollState.endLeft || state.endRight !== scrollState.endRight){
      setScrollState(state);
    }
  }

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
                    <ScaleFadeFlow
                      enterDelay={i * 0.08}
                      exitDelay={i * 0.08}
                      layout
                    >
                      <MoviePoster
                        linkTo={getRoute(RouteType.movie, {id: data.id.toString(),})}
                        imageURL={buildImageQuery(data.poster_path, "w185")}
                        imageWidth={185}
                        minWidth={200}
                        title={data.title}
                        releaseDate={data.release_date}
                        ratingScore={getMovieRating(
                          data.vote_count,
                          data.vote_average
                        )}
                        onMouseOver={() => handleMouseOver(data)}
                      />
                    </ScaleFadeFlow>
                  ),
                };
              });
            }}
          </HScroll>
        )}
        {scrollState.endLeft? 
            null
            :
            <Box position='absolute' display='flex' flexDirection='column' justifyContent='center' 
            left={0} top={0} bottom={0} bgcolor={fade(theme.palette.primary.light, 0.9)}>
              {scrollLeft}
            </Box>
        }
        {scrollState.endRight? 
            null
            :
            <Box position='absolute' display='flex' flexDirection='column' justifyContent='center' 
            right={0} top={0} bottom={0} bgcolor={fade(theme.palette.primary.light, 0.9)}>
              {scrollRight}
            </Box>
        }
      </Box>
  );
};

//render component when data are different
export default React.memo(MovieCollection, (pre, next) => {
  if (!pre.movieData || !next.movieData) return false;
  return pre.movieData === next.movieData;
});
