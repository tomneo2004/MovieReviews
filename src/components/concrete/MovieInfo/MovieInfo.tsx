import { Chip, SvgIcon, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";
import React from "react";
import {
  IGenreData,
  IMovieDetailData,
} from "../../../utils/api/model/apiModelTypes";
import convertFilmLength from "../../../utils/filmLengthConverter";
import getMovieRating from "../../../utils/movieRating";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import TimerIcon from '../../../assets/icons/stopwatch.inline.svg';
import { springTransition } from "../../../framer/Transition";
import ScaleFadeMotion from "../../../framer/ScaleFadeMotion/ScaleFadeMotion";

type MovieInfoProps = React.ComponentProps<typeof Box> & {
  movieDetail: IMovieDetailData;
};

const renderSkeletons = () => {
  const skProps1: SkeletonProps = {
    variant: "text",
    width: "40%",
    height: "10%",
  };
  const skProps2: SkeletonProps = {
    variant: "text",
    width: "60%",
  };
  return (
    <Box width="inherit" display="flex" flexDirection="column">
      <Skeleton {...skProps1} />
      <Skeleton {...skProps2} />
      <Skeleton {...skProps1} />
      <Skeleton {...skProps2} />
      <Skeleton {...skProps2} />
      <Skeleton {...skProps1} />
      <Skeleton {...skProps2} />
      <Skeleton {...skProps2} />
    </Box>
  );
};

const renderGenre = (genre: IGenreData[]) => {
  return genre.map((g, i) => {
    return (
      <ScaleFadeMotion key={g.name}
      enterTransition={springTransition(300, 55, i * 0.1)}
      exitTransition={springTransition(300, 55, (genre.length - 1 - i) * 0.1)}
      >
        <Typography key={g.id} component="div" variant="h4">
          <Box pl={i ? 2 : 0} fontWeight={500}>
            <Chip variant='outlined' color='primary' label={g.name} />
          </Box>
        </Typography>
      </ScaleFadeMotion>
    );
  });
};

const MovieInfo: React.FC<MovieInfoProps> = (props: MovieInfoProps) => {
  const { movieDetail, ...rest } = props;

  if (!movieDetail) return renderSkeletons();

  const userScore = getMovieRating(
    movieDetail.vote_count,
    movieDetail.vote_average
  );

  return (
    <Box {...rest} display="flex" flexDirection="column" justifyContent='space-between' p={2}>
        <Box display='flex'>
          {/* user score */}
          <Box pr={2}>{getCircularRating(userScore)}</Box>
          <Box display='flex' flexDirection='column' justifyContent='center'>
            {/* title */}
            <Typography component="div" variant="h3">
              <Box fontWeight={600}>{movieDetail.title}</Box>
            </Typography>
            {/* release date */}
            <Typography component="div" variant="h5">
                <Box fontWeight={400}>{movieDetail.release_date}</Box>
            </Typography>
          </Box>
        </Box>  
        
        <Box display='flex' alignItems='center'>
          <SvgIcon fontSize='large'>
            <TimerIcon />
          </SvgIcon>
          {/* film length */}
          <Typography component="div" variant="h5">
              <Box pl={2} fontWeight={400}>
                {convertFilmLength(movieDetail.runtime)}
              </Box>
          </Typography>
        </Box>

        {/* Genre */}
        <Box display="flex" flexDirection="column" pb={2}>
          <Typography component="div" variant="h4">
            <Box pb={1} fontWeight={600}>
              {"Genres"}
            </Box>
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {renderGenre(movieDetail.genres)}
          </Box>
        </Box>

        {/* tageline */}
        <Typography component="div" variant="h5">
          <Box pb={2} fontStyle="italic">
            {movieDetail.tagline}
          </Box>
        </Typography>

        {/* overview */}
        <Box display="flex" flexDirection="column">
          <Typography component="div" variant="h4">
            <Box pb={1} fontWeight={600}>
              {"Overview"}
            </Box>
          </Typography>
          <Typography component="div" variant="h6">
            <Box>{movieDetail.overview}</Box>
          </Typography>
        </Box>
    </Box>
  );
};

export default MovieInfo;
