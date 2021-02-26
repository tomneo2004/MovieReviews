import {
  Box,
  fade,
  Hidden,
  LinearProgress,
  SvgIcon,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import {
  IMovieData,
  INowPlayingData,
} from "../../../utils/api/model/apiModelTypes";
import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import PhantomText from "../PhantomText/PhantomText";
import LeftArrowIcon from "../../../assets/icons/left-arrow.inline.svg";
import RightArrowIcon from "../../../assets/icons/right-arrow.inline.svg";
import { formatDateTime } from "../../../utils/timeConverter";
import PlayingIcon from "../../../assets/icons/cinema.inline.svg";
import dynamic from "next/dynamic";

const MovieCollection = dynamic(
  () => import("../MovieCollection/MovieCollection"),
  {
    loading: () => (
      <Box p={2}>
        <LinearProgress />
      </Box>
    ),
  }
);

const SectionHeader = dynamic(() => import("../SectionHeader/SectionHeader"));

type SnippetNowPlayingProps = React.ComponentProps<typeof Box> & {
  nowPlayingMovies: INowPlayingData;
};

const SnippetNowPlaying: React.FC<SnippetNowPlayingProps> = (
  props: SnippetNowPlayingProps
) => {
  const { nowPlayingMovies, ...rest } = props;
  const theme = useTheme();
  const [popularBg, setPopularBg] = React.useState<string>("");

  const handlePopularMovieHover = (data: IMovieData) => {
    setPopularBg(buildImageQuery(data.backdrop_path, "original"));
  };
  return (
    <Box {...rest}>
      <SectionHeader
        px={2}
        bgcolor={theme.palette.primary.main}
        header={
          <React.Fragment>
            <Hidden smDown>
              <PhantomText
                height="100%"
                bgcolor={theme.palette.primary.light}
                px={1}
                text={`Now Playing`}
                charDelayDefs={{
                  0: { enter: 1, exit: 0 },
                  1: { enter: 1.2, exit: 0 },
                  2: { enter: 1.4, exit: 0 },
                  3: { enter: 1.6, exit: 0 },
                  4: { enter: 1.8, exit: 0 },
                  5: { enter: 2, exit: 0 },
                  6: { enter: 2.2, exit: 0 },
                  7: { enter: 2.4, exit: 0 },
                  8: { enter: 2.6, exit: 0 },
                  9: { enter: 2.8, exit: 0 },
                  10: { enter: 3, exit: 0 },
                }}
              />
            </Hidden>
            <Hidden mdUp>
              <Box
                bgcolor={theme.palette.primary.light}
                display="flex"
                p={1}
                justifyContent="center"
                alignItems="center"
              >
                <SvgIcon fontSize="large">
                  <PlayingIcon />
                </SvgIcon>
              </Box>
            </Hidden>
          </React.Fragment>
        }
        items={[
          <Box
            bgcolor={theme.palette.primary.light}
            display="flex"
            justifyContent="center"
            alignItems="center"
            px={2}
          >
            <Typography variant="h6">
              {`
                    ${formatDateTime(nowPlayingMovies.dates.minimum)} 
                    ~ 
                    ${formatDateTime(nowPlayingMovies.dates.maximum)}
                    `}
            </Typography>
          </Box>,
        ]}
      />
      <BackgroundImage
        imageSrc={popularBg}
        backdropColor={fade(theme.palette.primary.light, 0.6)}
        keyframesAnimIn={{
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        }}
        keyframesAnimOut={{
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        }}
        animOutTimeFun="ease"
        animInTimeFun="ease"
        loadingIndicator={
          <Box>
            <LinearProgress />
          </Box>
        }
      >
        <MovieCollection
          movieData={nowPlayingMovies.results}
          onHover={handlePopularMovieHover}
          scrollLeft={
            <SvgIcon fontSize="large">
              <LeftArrowIcon />
            </SvgIcon>
          }
          scrollRight={
            <SvgIcon fontSize="large">
              <RightArrowIcon />
            </SvgIcon>
          }
        />
      </BackgroundImage>
    </Box>
  );
};

export default SnippetNowPlaying;