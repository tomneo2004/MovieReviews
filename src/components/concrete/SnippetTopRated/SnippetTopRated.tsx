import {
    Box,
    fade,
    LinearProgress,
    SvgIcon,
    useTheme,
  } from "@material-ui/core";
  import React from "react";
  import { IMovieData } from "../../../utils/api/model/apiModelTypes";
  import { buildImageQuery } from "../../../utils/api/query/apiQueryBuilder";
  import BackgroundImage from "../BackgroundImage/BackgroundImage";
  import MovieCollection from "../MovieCollection/MovieCollection";
  import PhantomText from "../PhantomText/PhantomText";
  import SectionHeader from "../SectionHeader/SectionHeader";
  import LeftArrowIcon from "../../../assets/icons/left-arrow.inline.svg";
  import RightArrowIcon from "../../../assets/icons/right-arrow.inline.svg";
  
  type SnippetTopRatedProps = React.ComponentProps<typeof Box> & {
    topRatedMovies: IMovieData[];
  };
  
  const SnippetTopRated: React.FC<SnippetTopRatedProps> = (props: SnippetTopRatedProps) => {
    const { topRatedMovies, ...rest } = props;
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
          }
        />
        <BackgroundImage
          imageSrc={popularBg}
          backdropColor={fade(theme.palette.primary.light, 0.6)}
          keyframesAnimIn={{
            "0%": { opacity:0 },
            "100%": { opacity:1 },
          }}
          keyframesAnimOut={{
            "0%": { opacity:1 },
            "100%": { opacity:0 },
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
            movieData={topRatedMovies}
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
  
  export default SnippetTopRated;
  