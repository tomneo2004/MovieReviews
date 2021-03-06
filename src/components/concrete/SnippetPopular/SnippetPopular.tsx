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
import PopularIcon from "../../../assets/icons/heat.inline.svg";
import MovieCollection from "../MovieCollection/MovieCollection";
import SectionHeader from "../SectionHeader/SectionHeader";
import config from "../../../config/config";

type SnippetPopularProps = React.ComponentProps<typeof Box> & {
  popularMovies: IMovieData[];
};

const SnippetPopular: React.FC<SnippetPopularProps> = (
  props: SnippetPopularProps
) => {
  const { popularMovies, ...rest } = props;
  const theme = useTheme();
  const [popularBg, setPopularBg] = React.useState<string>("");

  const handleMovieHover = (index: number) => {
    const data = popularMovies[index];
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
                text={`What's Popular`}
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
                  11: { enter: 3.4, exit: 0 },
                  12: { enter: 3.6, exit: 0 },
                  13: { enter: 3.8, exit: 0 },
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
                  <PopularIcon />
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
          collectionHeight={config.Movie_Collection_Height}
          itemWidth={config.Movie_Collection_Item_Width}
          imageRatio={config.Movie_Collection_Image_Ratio}
          posterSize={config.Movie_Collection_Poster_Size}
          movieData={popularMovies}
          onHover={handleMovieHover}
        />
      </BackgroundImage>
    </Box>
  );
};

export default SnippetPopular;
