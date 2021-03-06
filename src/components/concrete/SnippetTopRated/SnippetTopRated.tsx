import Box from "@material-ui/core/Box/Box";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Hidden from "@material-ui/core/Hidden/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import {
  BackdropSize,
  getBackdropImageQuery,
} from "../../../utils/api/query/apiQueryBuilder";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import PhantomText from "../PhantomText/PhantomText";
import ThumbUpIcon from "../../../assets/icons/thumb-up.inline.svg";
import MovieCollection from "../MovieCollection/MovieCollection";
import SectionHeader from "../SectionHeader/SectionHeader";
import config from "../../../config/config";

type SnippetTopRatedProps = React.ComponentProps<typeof Box> & {
  topRatedMovies: IMovieData[];
};

const SnippetTopRated: React.FC<SnippetTopRatedProps> = (
  props: SnippetTopRatedProps
) => {
  const { topRatedMovies, ...rest } = props;
  const theme = useTheme();
  const [popularBg, setPopularBg] = React.useState<string>("");

  const handleMovieHover = (index: number) => {
    const data = topRatedMovies[index];
    setPopularBg(
      getBackdropImageQuery(data.backdrop_path, BackdropSize.original)
    );
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
                text={`Top Rated`}
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
                  <ThumbUpIcon />
                </SvgIcon>
              </Box>
            </Hidden>
          </React.Fragment>
        }
      />
      <BackgroundImage
        imageSrc={popularBg}
        backdropColor={fade(theme.palette.primary.light, 0.6)}
        keyframesAnimIn={{
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        }}
        keyframesAnimOut={{
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
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
          collectionHeight={config.Movie_Collection_Height}
          itemWidth={config.Movie_Collection_Item_Width}
          imageRatio={config.Movie_Collection_Image_Ratio}
          posterSize={config.Movie_Collection_Poster_Size}
          movieData={topRatedMovies}
          onHover={handleMovieHover}
        />
      </BackgroundImage>
    </Box>
  );
};

export default SnippetTopRated;
