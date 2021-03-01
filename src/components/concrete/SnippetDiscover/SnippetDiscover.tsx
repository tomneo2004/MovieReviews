import {
  Box,
  fade,
  LinearProgress,
  // SvgIcon,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import { BackdropSize, getBackdropImageQuery } from "../../../utils/api/query/apiQueryBuilder";
import BackgroundImage from "../BackgroundImage/BackgroundImage";
import MovieCollection from "../MovieCollection/MovieCollection";
import PhantomText from "../PhantomText/PhantomText";
import SectionHeader from "../SectionHeader/SectionHeader";
import config from '../../../config/config';
// import LeftArrowIcon from "../../../assets/icons/left-arrow.inline.svg";
// import RightArrowIcon from "../../../assets/icons/right-arrow.inline.svg";

type SnippetDiscoverProps = React.ComponentProps<typeof Box> & {
  discoverMovies: IMovieData[];
};

const SnippetDiscover: React.FC<SnippetDiscoverProps> = (
  props: SnippetDiscoverProps
) => {
  const { discoverMovies, ...rest } = props;
  const theme = useTheme();
  const [popularBg, setPopularBg] = React.useState<string>("");

  const handleMovieHover = (index:number) => {
    const data = discoverMovies[index];
    setPopularBg(getBackdropImageQuery(data.backdrop_path, BackdropSize.original));
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
            text={`Discover`}
            charDelayDefs={{
              0: { enter: 1, exit: 0 },
              1: { enter: 1.2, exit: 0 },
              2: { enter: 1.4, exit: 0 },
              3: { enter: 1.6, exit: 0 },
              4: { enter: 1.8, exit: 0 },
              5: { enter: 2, exit: 0 },
              6: { enter: 2.2, exit: 0 },
              7: { enter: 2.4, exit: 0 },
            }}
          />
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
          collectionHeight={400}
          itemWidth={200}
          imageRatio={config.Movie_Collection_Image_Ratio}
          posterSize={config.Movie_Collection_Poster_Size}
          movieData={discoverMovies}
          onHover={handleMovieHover}
          // scrollLeft={
          //   <SvgIcon fontSize="large">
          //     <LeftArrowIcon />
          //   </SvgIcon>
          // }
          // scrollRight={
          //   <SvgIcon fontSize="large">
          //     <RightArrowIcon />
          //   </SvgIcon>
          // }
        />
      </BackgroundImage>
    </Box>
  );
};

export default SnippetDiscover;
