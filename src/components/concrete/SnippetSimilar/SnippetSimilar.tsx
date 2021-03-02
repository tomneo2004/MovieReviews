import Box from "@material-ui/core/Box/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import PhantomText from "../PhantomText/PhantomText";
import MovieCollection from "../MovieCollection/MovieCollection";
import SectionHeader from "../SectionHeader/SectionHeader";
import { IMovieData } from "../../../utils/api/model/apiModelTypes";
import config from "../../../config/config";

type SnippetSimilarProps = React.ComponentProps<typeof Box> & {
  similars: IMovieData[];
};

const SnippetSimilar: React.FC<SnippetSimilarProps> = (
  props: SnippetSimilarProps
) => {
  const { similars, ...rest } = props;
  const theme = useTheme();

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
            text={`Related`}
            charDelayDefs={{
              0: { enter: 1, exit: 0 },
              1: { enter: 1.2, exit: 0 },
              2: { enter: 1.4, exit: 0 },
              3: { enter: 1.6, exit: 0 },
              4: { enter: 1.8, exit: 0 },
              5: { enter: 2, exit: 0 },
              6: { enter: 2.2, exit: 0 },
            }}
          />
        }
      />
      <MovieCollection
        collectionHeight={config.Movie_Collection_Height}
        itemWidth={config.Movie_Collection_Item_Width}
        imageRatio={config.Movie_Collection_Image_Ratio}
        posterSize={config.Movie_Collection_Poster_Size}
        movieData={similars}
      />
    </Box>
  );
};

export default SnippetSimilar;
