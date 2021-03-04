import Chip from "@material-ui/core/Chip/Chip";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton/Skeleton";
import React from "react";
import {
  IGenreData,
  IMovieDetailData,
  ISpokenLanguageData,
} from "../../../utils/api/model/apiModelTypes";
import convertFilmLength from "../../../utils/filmLengthConverter";
import getMovieRating from "../../../utils/movieRating";
import { getCircularRating } from "../../unit/CircularRating/CircularRating";
import TimerIcon from "../../../assets/icons/stopwatch.inline.svg";
import { springTransition } from "../../../framer/Transition";
import ScaleFadeMotion from "../../../framer/ScaleFadeMotion/ScaleFadeMotion";
import LinkTo from "../LinkTo/LinkTo";
import { formatDateTime } from "../../../utils/timeConverter";
import Link from 'next/link';
import { getRoute, RouteType } from "../../../routes/routesGenerator";

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
    if(!g.name) return null;
    return (
      <ScaleFadeMotion
        key={g.name}
        enterTransition={springTransition(300, 55, i * 0.1)}
        exitTransition={springTransition(300, 55, (genre.length - 1 - i) * 0.1)}
      >
        <Typography key={g.id} component="div" variant="h4">
          <Box pl={i ? 2 : 0} fontWeight={500}>
            <Link href={getRoute(RouteType.genre, {genreId:g.id.toString()})}>
            <Chip variant="outlined" color="primary" label={g.name} />
            </Link>
          </Box>
        </Typography>
      </ScaleFadeMotion>
    );
  });
};

const renderLangs = (langs: ISpokenLanguageData[]) => {
  return langs.map((lang, i) => {
    if(!lang.name) return null;
    return (
      <ScaleFadeMotion
        key={lang.name}
        enterTransition={springTransition(300, 55, i * 0.1)}
        exitTransition={springTransition(300, 55, (langs.length - 1 - i) * 0.1)}
      >
        <Typography key={lang.iso_639_1} component="div" variant="h4">
          <Box pl={i ? 2 : 0} fontWeight={500}>
            <Chip variant="outlined" color="primary" label={lang.name} />
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
    <Box {...rest} display="flex" flexDirection="column" p={2}>
      {/* general info */}
      <Box display="flex">
        {/* user score */}
        <Box pr={2}>{getCircularRating(userScore)}</Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {/* title */}
          <Typography component="div" variant="h3">
            <Box fontWeight={600}>{movieDetail.title}</Box>
          </Typography>
          {/* release date */}
          <Typography component="div" variant="h5">
            <Box fontWeight={400}>
              {formatDateTime(movieDetail.release_date)}
            </Box>
          </Typography>
        </Box>
      </Box>

      {/* film length */}
      <Box display="flex" alignItems="center" pt={2}>
        <SvgIcon fontSize="large">
          <TimerIcon />
        </SvgIcon>
        <Typography component="div" variant="h5">
          <Box pl={2} fontWeight={400}>
            {convertFilmLength(movieDetail.runtime)}
          </Box>
        </Typography>
      </Box>

      {/* languages */}
      <Box display="flex" flexDirection="column" pt={2}>
        <Typography component="div" variant="h4">
          <Box pb={1} fontWeight={600}>
            {"Languages"}
          </Box>
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {renderLangs(movieDetail.spoken_languages)}
        </Box>
      </Box>

      {/* Genre */}
      <Box display="flex" flexDirection="column" pt={2}>
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
      {!movieDetail.tagline ? null : (
        <Typography component="div" variant="h5">
          <Box pt={2} fontStyle="italic">
            {movieDetail.tagline}
          </Box>
        </Typography>
      )}

      {/* overview */}
      <Box display="flex" flexDirection="column" pt={2}>
        <Typography component="div" variant="h4">
          <Box pb={1} fontWeight={600}>
            {"Overview"}
          </Box>
        </Typography>
        <Typography component="div" variant="h6">
          <Box>{movieDetail.overview}</Box>
        </Typography>
      </Box>

      {/* offical website */}
      {!movieDetail.homepage ? null : (
        <Box pt={2}>
          <LinkTo text="Offical website" linkTo={movieDetail.homepage} />
        </Box>
      )}
    </Box>
  );
};

export default MovieInfo;
